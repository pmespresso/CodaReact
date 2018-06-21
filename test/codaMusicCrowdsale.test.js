var CodaMusicTokensRegistry = artifacts.require('./CodaMusicTokensRegistry.sol');
var CodaMusicCrowdsalesRegistry = artifacts.require('./CodaMusicCrowdsalesRegistry.sol');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

contract.only('CodaMusicCrowdsalesRegistry', function(accounts) {

  describe('Before Crowdsale Deploy -> ', function() {
    it('(->) user token balance should be 0', async function() {
        var CodaMusicCrowdsalesRegistryInstance = await CodaMusicCrowdsalesRegistry.deployed();

        var crowdsales_length = await CodaMusicCrowdsalesRegistryInstance.getCrowdsalesLengthForUser(accounts[0]);

        assert.equal(crowdsales_length, 0, 'user should have no crowdsales launched');
    });
  });

  describe('Crowdsale Deploy -> ', function() {
    var CodaMusicTokensRegistryInstance;
    var CodaMusicCrowdsalesRegistryInstance;
    var crowdsaleDetails;

    before(async function() {
      CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();
      CodaMusicCrowdsalesRegistryInstance = await CodaMusicCrowdsalesRegistry.deployed();

      const _name = 'test token';
      const _symbol = 'TT';
      const _decimals = 18;
      const _total_supply = 100000;

      const txn = await CodaMusicTokensRegistryInstance.deployToken(_name, _symbol, _decimals, _total_supply, { from: accounts[0] });

      assert.isObject(txn, 'deploy token should return a txn object');
    });

    it(' (->) should deploy', async function() {
      var _rate = 10000;
      var _crowdsaleWallet = accounts[1];

      var tokenDetails = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
      var _token = tokenDetails[3];

      console.log(tokenDetails);

      var txn = await CodaMusicCrowdsalesRegistryInstance.deployCrowdsale(_rate, _crowdsaleWallet, _token);

      assert.isObject(txn, 'deploy crowdsale should return a txn object. ');
    });

    it(' (->) crowdsale registry length should now be 1', async function() {
      var length = await CodaMusicCrowdsalesRegistryInstance.getCrowdsalesLengthForUser(accounts[0]);

      assert.equal(length, 1, 'should have one deployed crowdsale');
    });

    it(' (->) should be able to get crowdsale details', async function() {
      crowdsaleDetails = await CodaMusicCrowdsalesRegistryInstance.getCrowdsaleAtIndex(accounts[0], 0);

      console.log(crowdsaleDetails);

      var crowdsale_token_address = crowdsaleDetails[0];
      var crowdsale_wallet_address = crowdsaleDetails[1];
      var crowdsale_rate = crowdsaleDetails[2];

      assert.isString(crowdsale_token_address, 'crowdsale token address should be a string');
      assert.isString(crowdsale_wallet_address, 'crowdsale wallet address should be a string');
      assert.isNumber(crowdsale_rate.toNumber(), 'crowdsale rate should be a number');
    });

    it(' (->) should be able to get Ether balance of a crowdsale wallet', async function() {
      var crowdsale_wallet_address = crowdsaleDetails[1];

      var crowdsale_eth_balance = await CodaMusicCrowdsalesRegistryInstance.etherBalanceOf(crowdsale_wallet_address);

      var crowdsale_beneficiary_wallet;

      var crowdsale_beneficiary_wallet = await web3.eth.getBalance(accounts[1]);
      assert.equal(crowdsale_eth_balance.toNumber(), crowdsale_beneficiary_wallet, 'should be able to query ETH balance of crowdsale beneficiary through the registry by crowdsale address');
    });

    it(' (->) should be able to get wei raised by a crowdsale wallet', async function() {
      var crowdsale_wallet_address = crowdsaleDetails[1];

      var crowdsale_token_balance = await CodaMusicCrowdsalesRegistryInstance.getWeiRaisedBy(crowdsale_wallet_address);

      console.log(crowdsale_token_balance);

      assert.equal(crowdsale_token_balance, 0, 'should have initial token balance of zero');
    });
  });
});
