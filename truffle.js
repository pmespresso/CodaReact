var HDWalletProvider = require("truffle-hdwallet-provider");
console.log(process.env.MNEMONIC);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 4
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/" + process.env.ROPSTEN_KEY)
      },
      network_id: 3,
      gas: 4700000
    }
  }
};
