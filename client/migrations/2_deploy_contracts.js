const Token = artifacts.require("./NFTeaseToken.sol")
const NFTease = artifacts.require("./NFTease.sol")
let token

// module.exports = function(deployer) {
//     deployer.deploy(Token);
// }
module.exports = function(deployer, network, accounts) {
    deployer.deploy(
        Token
    ).then(tokenInstance => {
        token = tokenInstance
        return deployer.deploy(NFTease, token.address)
    }).then(async nftease => {
        await token.contract.methods.setNFTease(nftease.address).send({
            from: accounts[0]
        })
        console.log('Is set?', await token.contract.methods.isTokenSet().call())
        console.log('Deployed both!')
    })
}
