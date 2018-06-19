pragma solidity ^0.4.17;
import './CodaMusicToken.sol';

contract CodaMusicTokensRegistry {

  event TokenDeployed(
    string name,
    string symbol,
    address owner,
    address token_address,
    uint256 total_supply
  );

  event Balance(
    address token,
    address user,
    uint256 balance
  );

  /* mapping (user address => token addresses) public owners; */
  mapping (address => address[]) public owners;
  //mapping of token addresses to mapping of account balances (token=0 means Ether)
  mapping (address => mapping (address => uint256)) public token_balances;

  address[] public tokens;

  modifier onlyCEO() {
    _;
  }

  modifier onlyApprovedArtists() {
    _;
  }

  function getTokenDetails(address _token_address) returns (string, string, address, address, uint256, uint256, uint256) {
    return CodaMusicToken(_token_address).getDetails();
  }

  /* very expensive function */
	function deployToken(string _name, string _symbol, uint256 _decimals, uint256 _total_supply) public returns (address) {
    CodaMusicToken newCodaToken = (new CodaMusicToken(_name, _symbol, _decimals, _total_supply));

  	owners[msg.sender].push(newCodaToken);
    tokens.push(newCodaToken);

    token_balances[newCodaToken][msg.sender] = _total_supply;

    newCodaToken.transfer(msg.sender, _total_supply);

    emit TokenDeployed(_name, _symbol, msg.sender, address(newCodaToken), _total_supply);
		return address(newCodaToken);
	}

  function balanceOf(address token, address user) constant returns (uint256) {
    /* return token_balances[token][user]; */

    uint256 __balance = CodaMusicToken(token).balanceOf(user);

    emit Balance(token, user, __balance);

    return __balance;
  }

  function getTokensLengthForUser(address user) public view returns(uint256) {
    return owners[user].length;
  }

	function getTokenAtIndex(address token_owner, uint256 token_index) public view returns(string, string, address, address, uint256, uint256, uint256) {
    assert(token_owner != address(0));
    assert(token_index >= 0);

    CodaMusicToken token = CodaMusicToken(owners[token_owner][token_index]);

    return token.getDetails();
	}
}
