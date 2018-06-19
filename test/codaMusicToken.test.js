var CodaMusicTokensRegistry = artifacts.require('./CodaMusicTokensRegistry.sol');

contract('CodaMusicTokensRegistry', function(accounts) {

  describe('Before Token Deploy -> ', function() {
    it('(->) user token balance should be 0', async function() {
        var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

        var tokens_length = await CodaMusicTokensRegistryInstance.getTokensLengthForUser(accounts[0]);

        assert.equal(tokens_length, 0, 'Coda Tokens Registry length should be 0');
    });
  });

  describe('Token Deploy -> ', function() {
    it(" (->) should create a new token", async function() {
      var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();
      var name = 'Test Token';
      var symbol = 'TTT';
      var total_supply = 123456789;

      var txn = await CodaMusicTokensRegistryInstance.deployToken(name, symbol, 18, total_supply);

      assert.isObject(txn, 'Deploying token should return a txn object');
    });
  });

  describe('After Single Token Deploy -> ', function() {
    it(" (->) should be added to owners mapping", async function () {
      var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

      var tokensLength = await CodaMusicTokensRegistryInstance.getTokensLengthForUser(accounts[0]);

      assert.equal(tokensLength.toNumber(), 1);
    });

    it(' (->) should send the starting total supply to msg.sender', async function() {
      var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();
      var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
      assert.isNotNull(token, 'Token should not be null');
      var balance = await CodaMusicTokensRegistryInstance.balanceOf(token[3], accounts[0]);
      assert.equal(balance.toNumber(), 123456789, 'Initial balance of user should be 123456789');
    });

    it(' (->) should not keep any balance in the registry account', async function() {
      var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();
      var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
      assert.isNotNull(token, 'Token should not be null');
      var balance = await CodaMusicTokensRegistryInstance.balanceOf(token[3], CodaMusicTokensRegistryInstance.address);
      assert.equal(balance.toNumber(), 0, 'balance of registry should be zero');
    })
  });

  describe('After Multiple Token Deploys -> ', function() {

    it(' (->) should add a second token to account 0 in registry', async function() {
      var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

      var name = 'Second Token';
      var symbol = 'TTT_2';
      var total_supply = 999;

      var txn = await CodaMusicTokensRegistryInstance.deployToken(name, symbol, 18, total_supply);
      assert.isObject(txn, 'Deploying token should return a txn object');

      var tokensLength = await CodaMusicTokensRegistryInstance.getTokensLengthForUser(accounts[0]);
      assert.equal(tokensLength.toNumber(), 2);
    });

    it(' (->) should be able to iterate through tokens owned by a user', async function() {
      var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();
      var tokensLength = await CodaMusicTokensRegistryInstance.getTokensLengthForUser(accounts[0]);

      var tokens = [];
      for (var i = 0; i < tokensLength; i++) {
        var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], i);
        tokens.push(token);
      }

      console.log(tokens);

      assert.equal(tokens.length, 2, 'should retrieve the 2 tokens launched so far');
    });

    it(' (->) should be able to ', async function() {
      var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();
      var tokensLength = await CodaMusicTokensRegistryInstance.getTokensLengthForUser(accounts[0]);

      var tokens = [];
      for (var i = 0; i < tokensLength; i++) {
        var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], i);
        tokens.push(token);
      }

      console.log(tokens);

      assert.equal(tokens.length, 2, 'should retrieve the 2 tokens launched so far');
    });
  });
});
