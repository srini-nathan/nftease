module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // TEST GANACHE
      network_id: "*", // Match any network id
    },
  },
  contracts_directory: "./src/contracts/", // ~ NFT DIRECTORY
  contracts_build_directory: "./src/abis/", //
  compilers: {
    solc: {
      version: "0.7.4",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
