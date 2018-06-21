pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CodaMusicToken.sol";

contract TestCodaMusicToken {

  function testItCreatesANewToken() public {
    CodaMusicToken codaMusicToken = new CodaMusicToken("Test Token", "TEST", 18, 100);

    string expected = "Test Token";

    Assert.equal(codaMusicToken.name, expected, "it should store name: Test Token");

  }

}
