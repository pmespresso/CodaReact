pragma solidity ^0.4.17;
import './CodaMusicToken.sol';

contract CodaMusicTokensRegistry {

  event TokenDeployed(string name, string symbol);

  struct Token {
      string name;
      string symbol;
      address owner;
      address token_address;
      uint256 total_supply;
  }

  // user_address => [token_1_address, token_2_address, ...]
  /* mapping (address => address[]) public owners; */
  mapping (address => Token[]) public owners;
  //mapping of token addresses to mapping of account balances (token=0 means Ether)
  mapping (address => mapping (address => uint256)) public tokens;

  /* very expensive function */

	function deployToken(string _name, string _symbol, uint256 _decimals, uint256 _total_supply) public payable returns (address) {
    CodaMusicToken newCodaToken = (new CodaMusicToken(_name, _symbol, _decimals, _total_supply));

    Token memory newTokenStruct = Token(_name, _symbol, msg.sender, newCodaToken, _total_supply);
  	owners[msg.sender].push(newTokenStruct);

    tokens[newCodaToken][msg.sender] = _total_supply;

    //TODO: make this work
    /* newCodaToken.transfer(msg.sender, _total_supply); */

    emit TokenDeployed(_name, _symbol);
		return address(newCodaToken);
	}

  function balanceOf(address token, address user) constant returns (uint256) {
    return tokens[token][user];
  }

  function getTokensLengthForUser(address user) public view returns(uint256) {
    return owners[user].length;
  }

	function getTokenAtIndex(address addr, uint256 token_index) public view returns(string, string, address, address, uint256 ) {
    return (owners[addr][token_index].name, owners[addr][token_index].symbol, owners[addr][token_index].owner, owners[addr][token_index].token_address, owners[addr][token_index].total_supply);
	}
}
