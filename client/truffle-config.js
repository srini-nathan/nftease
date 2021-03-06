// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*"
     // gas: 4600000       // Any network (default: none)
    }
    // ropsten: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infuraKey}`),
    //   network_id: 3,       // Ropsten's id
    //   // gas: 46000,        // Ropsten has a lower block limit than mainnet
    //   confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // }
  }
}
