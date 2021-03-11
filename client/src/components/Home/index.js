import React, { Component } from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import ABI from "../../build/contracts/Ecommerce.json";
// import CreateProduct from './components/Sell'
import PageHeader from "./PageHeader";
import FeatureCards from "../FeaturedCards";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/paper-kit.css";
import Background from "../../assets/img/path1.png";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    console.log(Background);

    this.state = {
      networkId: null,
      web3: null,
      contractInstance: null,
      products: [],
      productsHtml: [],
      product: {},
      user: "",
      test: "",
    };
  }

  async componentWillMount() {
    // await this.setup();
    await this.loadBlockchain();
  }

  // async setup() {
  //   // Create the contract instance
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     // TODO : Dynamic error - render from local server instead of blockchain
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //   }
  // }

  async loadBlockchain() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const loggedinUser = await web3.eth.getAccounts();
    // window.contract = new web3.eth.Contract(ABI.abi, ABI.networks['3'])
    this.setState({ user: loggedinUser[0] });

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ABI.networks[networkId];
    const instance = new web3.eth.Contract(
      ABI.abi,
      deployedNetwork && deployedNetwork.address
    );
    this.setState({
      networkId: networkId,
      web3: web3,
      contractInstance: instance,
    });

    // Fetch NFTs listed for sale
    await this.getLatestNFT(15); // pass number of NFT's to display.
    await this.displayForSale();
  }

  // fetch currently listed NFTs
  async displayForSale() {
    let productsHtml = [];
    if (this.state.products.length == 0) {
      productsHtml = (
        <div key="0" className="center">
          Nothing listed yet...
        </div>
      );
    } else {
      await this.state.products.reduce(async (promise, product) => {
        await promise;
        productsHtml.push(
          <div key={product.id} className="product">
            <img className="product-image" src={product.image} />
            <div className="product-data">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-description">
                {product.description.substring(0, 50) + "..."}
              </div>
              <div className="product-price">{product.price} ETH</div>
              <button
                onClick={() => {
                  this.setState({ product });
                  // this.redirectTo('/product')
                }}
                className="product-view"
                type="button"
              >
                View
              </button>
            </div>
          </div>
        );
      }, Promise.resolve());
    }
    this.setState({ productsHtml });
  }
  // {this.state.productsHtml}
  // redirectTo(location) {
  // 	this.props.history.push({
  // 		pathname: location
  // 	})
  // }

  async getLatestNFT(amount) {
    // guard to ensure contract is deployed
    const nftCount = parseInt(
      await this.state.contractInstance.methods.getProductsLength().call()
    );
    if (nftCount == 0 || nftCount == null || nftCount == undefined) {
      return;
    }
    let products = [];
    let condition = amount > nftCount ? 0 : nftCount - amount;
    // Loop through all of them one by one
    for (let i = nftCount; i > condition; i--) {
      let product = await this.state.contractInstance.methods
        .products(i - 1)
        .call();
      product = {
        id: parseInt(product.id),
        title: product.title,
        date: parseInt(product.date),
        description: product.description,
        image: product.image,
        owner: product.owner,
        price: this.state.web3.utils.fromWei(String(product.price)),
      };
      products.push(product);
    }

    this.setState({ products });
  }
  // <LandingPageHeader web3={this.state.web3} />
  /* <Container>
            <div className="aboveBg">
              <h1>Hello, World!</h1>
              <p>Your account: {this.state.user}</p>
              <p>Test: {this.state.productsHtml}</p>
              <p>Create product</p>
            </div>
          </Container> */
  render() {
    return (
      <>
        <PageHeader />
        <div className="section section-basic">
          <img alt="Dead" className="path" src={Background} />
          <FeatureCards />
        </div>
      </>
    );
  }
}
// export default Home;
