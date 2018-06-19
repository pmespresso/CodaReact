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

      var txn = await CodaMusicTokensRegistryInstance.deployToken(name, symbol, 18, total_supply, {from: accounts[0]});

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

      var txn = await CodaMusicTokensRegistryInstance.deployToken(name, symbol, 18, total_supply, { from: accounts[0] });
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

    describe('After Second User Deploys New Token -> ', function() {
      it (' (->) should add a third token in total, first token to acccount 1 in registry', async function() {
        var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

        var name = 'Token 3';
        var symbol = 'T3T';
        var total_supply = 3333333333;

        var txn = await CodaMusicTokensRegistryInstance.deployToken(name, symbol, 18, total_supply, { from: accounts[1] });

        assert.isObject(txn, 'Deploying token should return a txn object');

        var tokensLength = await CodaMusicTokensRegistryInstance.getTokensLengthForUser(accounts[1]);
        assert.equal(tokensLength, 1, 'acccount 1 should have a single token belonging to it in the registry');
      });

      it(' (->) account 1 should have the entire starting total supply in its balances', async function() {
        var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

        var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[1], 0);
        assert.isNotNull(token, 'Token should not be null');

        console.log('token -> ', token);

        var balance = await CodaMusicTokensRegistryInstance.balanceOf(token[3], accounts[1]);
        assert.equal(balance.toNumber(), 3333333333, 'account 1s balance of Token 3 should equal 3333333333');
      });
    });

    describe('Ownable -> ', function() {
      it(' (->) should be owned by the token creator', async function() {
        var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

        var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
        var expected_owner = token[2];

        assert.equal(expected_owner, accounts[0], 'token owner should be its creator');
      });

      it(' (->) should change ownership after transferOwnership', async function() {
        var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

        // first user 0 owns his token at index 0
        var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
        var token_address = token[3];

        // then user 0 transfers ownership to user 1 of that token
        await CodaMusicTokensRegistryInstance.transferOwnership(token_address, accounts[1], { from: accounts[0] });

        // get that token again
        token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
        var new_owner = token[2];
        var expected_owner = accounts[1];

        assert.equal(new_owner, expected_owner, 'token owner should have switched from creator');

        // account 1 transfers ownership back to account 0
        await CodaMusicTokensRegistryInstance.transferOwnership(token_address, accounts[0], { from: accounts[1] });

        token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
        new_owner = token[2];
        expected_owner = accounts[0];

        assert.equal(new_owner, expected_owner, 'token owner should switch back to creator');
      });
    });

    describe('Burning Tokens -> ', function() {
      it(' (->) Account 0 should be able to burn tokens it owns', async function() {
        var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

        var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
        var token_address = token[3];

        await CodaMusicTokensRegistryInstance.burnToken(token_address, 56789, {
          from:  accounts[0],
          gas: 6721975
        });

        var balance = await CodaMusicTokensRegistryInstance.balanceOf(token_address, accounts[0]);
        assert.equal(balance.toNumber(), 123400000);
      });

      //TODO: make it so only the token owner or COO or something can burn tokens
      it.skip(' (->) Account 1 fail to burn tokens it does not own', async function() {
        var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

        var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);

        /*
        Expect this to fail on VM exception since it should fail an assert

        https://stackoverflow.com/questions/36595575/what-is-the-pattern-for-handling-throw-on-a-solidity-contract-in-tests
        */
        try {
          var r = await CodaMusicTokensRegistryInstance.burnToken(token[3], 56789, {
            from:  accounts[1],
            gas: 6721975
          });

          console.log(r);
        } catch(error) {
          assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }
      });
    });

    describe('Minting Tokens -> ', function() {
      it('onlyOwner should be able to mint new tokens', async function() {
        var CodaMusicTokensRegistryInstance = await CodaMusicTokensRegistry.deployed();

        var token = await CodaMusicTokensRegistryInstance.getTokenAtIndex(accounts[0], 0);
        var expected_initial_balance = 123400000;
        var balance = await CodaMusicTokensRegistryInstance.balanceOf(token[3], accounts[0]);
        assert.equal(balance.toNumber(), expected_initial_balance, 'balance should start at 123400000');

        var mint_bool = await CodaMusicTokensRegistryInstance.mint(token[3], accounts[0], 10000, { from: accounts[0] });

        assert.isObject(mint_bool, 'Minting should return tx object on success');

        var new_balance = await CodaMusicTokensRegistryInstance.balanceOf(token[3], accounts[0]);

        assert.equal(new_balance.toNumber(), 123410000, 'new balance should be 123,410,000 after minting 10000');
      });
    });
  });
});
