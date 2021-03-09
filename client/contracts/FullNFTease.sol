pragma solidity ^0.5.0;

import './ERC721.sol';

/// @notice The NFTease Token that implements the ERC721 token with mint function
/// @author tyler p <typalacsko@Outlook.com>.
contract NFTeaseToken is ERC721 {
    address public token;
    bool public isTokenSet = false;

    /// @notice To generate a new token for the specified address
    /// @param _to The receiver of this new token
    /// @param _tokenId The new token id, must be unique
    function mint(address _to, uint256 _tokenId) public {
        require(msg.sender == token, 'Only the NFTeaseToken contract can mint new tokens');
        _mint(_to, _tokenId);
    }

    /// @notice To set the NFTease smart contract address
    function setNFTease(address _token) public {
        require(!isTokenSet, 'The NFTeaseToken address can only be set once');
        require(_token != address(0), 'The NFTeaseToken address cannot be empty');
        isTokenSet = true;
        token = _token;
    }
}

/// @notice The main NFTease contract to buy and sell ERC-721 tokens representing our users uploaded content
/// @author tyler p <typalacsko@Outlook.com>.
contract NFTease {
    /*
        - A function to publish, sell products with unique token ids
        - A function to buy products
        - A function to mark purchased products as completed by the seller
        - A function to get all the orders
        - A function to get the recent products
    */
    struct Product {
        uint256 id;
        string title;
        string description;
        uint256 date;
        address payable owner;
        uint256 price;
        string image;
    }
    struct Order {
        uint256 id;
        string nameUsername;
        string state; // Either 'pending', 'completed'
    }
    // Seller address => products
    mapping(address => Product[]) public sellerProducts; // The published products by the seller
    // Seller address => products
    mapping(address => Order[]) public pendingSellerOrders; // The products waiting to be fulfilled by the seller, used by sellers to check which orders have to be filled
    // Buyer address => products
    mapping(address => Order[]) public pendingBuyerOrders; // The products that the buyer purchased waiting to be sent
    // Seller address => products
    mapping(address => Order[]) public completedSellerOrders; // A history of past orders fulfilled by the seller
    // Buyer address => products
    mapping(address => Order[]) public completedBuyerOrders; // A history of past orders made by this buyer
    // Product id => product
    mapping(uint256 => Product) public productById;
    // Product id => order
    mapping(uint256 => Order) public orderById;
    // Product id => true or false
    mapping(uint256 => bool) public productExists;
    Product[] public products;
    Order[] public orders;
    uint256 public lastId;
    address public token;
    uint256 public lastPendingSellerOrder;
    uint256 public lastPendingBuyerOrder;

    /// @notice To setup the address of the ERC-721 token to use for this contract
    /// @param _token The token address
    constructor(address _token) public {
        token = _token;
    }

    /// @notice To publish a product as a seller
    /// @param _title The title of the product
    /// @param _description The description of the product
    /// @param _price The price of the product in ETH
    /// @param _image The image URL of the product
    function publishProduct(string memory _title, string memory _description, uint256 _price, string memory _image) public {
        require(bytes(_title).length > 0, 'The title cannot be empty');
        require(bytes(_description).length > 0, 'The description cannot be empty');
        require(_price > 0, 'The price cannot be empty (denoted in ETH)');
        require(bytes(_image).length > 0, 'The image cannot be empty');

        Product memory p = Product(lastId, _title, _description, now, msg.sender, _price * 1e18 , _image);
        products.push(p);
        sellerProducts[msg.sender].push(p);
        productById[lastId] = p;
        productExists[lastId] = true;
        NFTeaseToken(token).mint(address(this), lastId); // Create a new token for this product which will be owned by this contract until sold
        lastId++;
    }

    /// @notice To buy a new product, note that the seller must authorize this contract to manage the token
    /// @param _id The id of the product to buy
    /// @param _nameUsername an optional value for the user to display their name publically (purchaser)

    function buyProduct(uint256 _id, string memory _nameUsername) public payable {
        require(productExists[_id], 'The product must exist to be purchased');

        Product memory p = productById[_id];
        Order memory newOrder = Order(_id, _nameUsername, 'pending');
        require(msg.value >= p.price, "The payment must be larger or equal than the products price");

        // Return the excess ETH sent by the buyer
        // TODO: take transaction fee 
        if(msg.value > p.price) msg.sender.transfer(msg.value - p.price);
        pendingSellerOrders[p.owner].push(newOrder);
        pendingBuyerOrders[msg.sender].push(newOrder);
        orders.push(newOrder);
        orderById[_id] = newOrder;
        lastPendingSellerOrder = pendingSellerOrders[p.owner].length > 0 ? pendingSellerOrders[p.owner].length - 1 : 0;
        lastPendingBuyerOrder = pendingBuyerOrders[p.owner].length > 0 ? pendingBuyerOrders[p.owner].length - 1 : 0;
        NFTeaseToken(token).transferFrom(p.owner, msg.sender, _id); // Transfer the product token to the new owner
        p.owner.transfer(p.price);
    }

    /// @notice To mark an order as completed
    /// @param _id The id of the order which is the same for the product id
    function markOrderCompleted(uint256 _id) public {
        Order memory order = orderById[_id];
        Product memory product = productById[_id];
        require(product.owner == msg.sender, 'Only the seller can mark the order as completed');
        order.state = 'completed';

        // Delete the seller order from the array of pending orders
        for(uint256 i = 0; i < pendingSellerOrders[product.owner].length; i++) {
            if(pendingSellerOrders[product.owner][i].id == _id) {
                Order memory lastElement = orderById[lastPendingSellerOrder];
                pendingSellerOrders[product.owner][i] = lastElement;
                pendingSellerOrders[product.owner].length--;
                lastPendingSellerOrder--;
            }
        }
        // Delete the seller order from the array of pending orders
        for(uint256 i = 0; i < pendingBuyerOrders[msg.sender].length; i++) {
            if(pendingBuyerOrders[msg.sender][i].id == order.id) {
                Order memory lastElement = orderById[lastPendingBuyerOrder];
                pendingBuyerOrders[msg.sender][i] = lastElement;
                pendingBuyerOrders[msg.sender].length--;
                lastPendingBuyerOrder--;
            }
        }
        completedSellerOrders[product.owner].push(order);
        completedBuyerOrders[msg.sender].push(order);
        orderById[_id] = order;
    }

    /// @notice To get the latest product ids so that we can get each product independently
    /// @param _amount The number of products to get
    /// @return uint256[] The array of ids for the latest products added
    function getLatestProductIds(uint256 _amount) public view returns(uint256[] memory) {
        // If you're requesting more products than available, return only the available
        uint256 length = products.length;
        uint256 counter = (_amount > length) ? length : _amount;
        uint256 condition = (_amount > length) ? 0 : (length - _amount);
        uint256[] memory ids = new uint256[](_amount > length ? _amount : length);
        uint256 increment = 0;
        // Loop backwards to get the most recent products first
        for(int256 i = int256(counter); i >= int256(condition); i--) {
            ids[increment] = products[uint256(i)].id;
        }
        return ids;
    }

    /// @notice To get a single product broken down by properties
    /// @param _id The id of the product to get
    /// @return The product properties including all of them
    function getProduct(uint256 _id) public view returns(uint256 id, string memory title, string memory description, uint256 date, address payable owner, uint256 price, string memory image) {
        Product memory p = productById[_id];
        id = p.id;
        title = p.title;
        description = p.description;
        date = p.date;
        owner = p.owner;
        price = p.price;
        image = p.image;
    }

    /// @notice To get the latest ids for a specific type of order, if it's a seller type of order the _owner address must be the seller's
    /// @param _type The type of order which can be 'pending-seller', 'pending-buyer', 'completed-seller' and 'completed-buyer'
    /// @param _owner The address from which get the order data
    /// @param _amount How many ids to get
    /// @return uint256[] The most recent ids sorted from newest to oldest
    function getLatestOrderIds(string memory _type, address _owner, uint256 _amount) public view returns(uint256[] memory) {
        // If you're requesting more products than available, return only the available
        uint256 length;
        uint256 counter;
        uint256 condition;
        uint256[] memory ids;
        uint256 increment = 0;

        if(compareStrings(_type, 'pending-seller')) {
            length = pendingSellerOrders[_owner].length;
            counter = (_amount > length) ? length : _amount;
            condition = (_amount > length) ? 0 : (length - _amount);
            ids = new uint256[](_amount > length ? _amount : length);
            for(int256 i = int256(counter); i >= int256(condition); i--) {
                ids[increment] = uint256(pendingSellerOrders[_owner][uint256(i)].id);
            }
        } else if(compareStrings(_type, 'pending-buyer')) {
            length = pendingBuyerOrders[_owner].length;
            counter = (_amount > length) ? length : _amount;
            condition = (_amount > length) ? 0 : (length - _amount);
            ids = new uint256[](_amount > length ? _amount : length);
            for(int256 i = int256(counter); i >= int256(condition); i--) {
                ids[increment] = uint256(pendingBuyerOrders[_owner][uint256(i)].id);
            }
        } else if(compareStrings(_type, 'completed-seller')) {
            length = completedSellerOrders[_owner].length;
            counter = (_amount > length) ? length : _amount;
            condition = (_amount > length) ? 0 : (length - _amount);
            ids = new uint256[](_amount > length ? _amount : length);
            for(int256 i = int256(counter); i >= int256(condition); i--) {
                ids[increment] = uint256(completedSellerOrders[_owner][uint256(i)].id);
            }
        } else if(compareStrings(_type, 'completed-buyer')) {
            length = completedBuyerOrders[_owner].length;
            counter = (_amount > length) ? length : _amount;
            condition = (_amount > length) ? 0 : (length - _amount);
            ids = new uint256[](_amount > length ? _amount : length);
            for(int256 i = int256(counter); i >= int256(condition); i--) {
                ids[increment] = uint256(completedBuyerOrders[_owner][uint256(i)].id);
            }
        }

        return ids;
    }

    /// @notice To get an individual order with all the parameters
    /// @param _type The type of order which can be 'pending-seller', 'pending-buyer', 'completed-seller' and 'completed-buyer'
    /// @param _owner The address from which get the order data
    /// @param _id The order id
    /// @return Returns all the parameters for that specific order
    function getOrder(string memory _type, address _owner, uint256 _id) public view returns(uint256 id, string memory nameUsername, string memory state) {
        Order memory o;
        if(compareStrings(_type, 'pending-seller')) {
            o = pendingSellerOrders[_owner][_id];
        } else if(compareStrings(_type, 'pending-buyer')) {
            o = pendingBuyerOrders[_owner][_id];
        } else if(compareStrings(_type, 'completed-seller')) {
            o = completedSellerOrders[_owner][_id];
        } else if(compareStrings(_type, 'completed-buyer')) {
            o = completedBuyerOrders[_owner][_id];
        }

        id = o.id;
        nameUsername = o.nameUsername;
        state = o.state;
    }

    /// @notice To compare two strings since we can't use the normal operator in solidity
    /// @param a The first string
    /// @param b The second string
    /// @return bool If they are equal or not
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
       return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
