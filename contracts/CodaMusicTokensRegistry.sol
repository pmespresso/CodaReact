pragma solidity ^0.4.19;
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
  //mapping of token addresses to mapping of accounts to their balances (token=0 means Ether)
  mapping (address => mapping (address => uint256)) public token_balances;

  /* one to one mapping of token to owner */
  mapping(address => address) public tokenToOwner;

  modifier onlyCEO() {
    _;
  }

  modifier onlyTokenOwner() {
    //TODO:
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
    tokenToOwner[newCodaToken] = msg.sender;

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
    require(token_owner != address(0));
    require(token_index >= 0);

    CodaMusicToken token = CodaMusicToken(owners[token_owner][token_index]);

    return token.getDetails();
	}

  function burnToken(address _token, uint256 _value) public onlyTokenOwner() {
    CodaMusicToken(_token).burn(_value);
  }

  function transferOwnership(address _token, address _newOwner) public {
    CodaMusicToken(_token).transferOwnership(_newOwner);
  }

  function mint(address _token, address _to, uint256 _value) public returns (bool) {
    return CodaMusicToken(_token).mint(_to, _value);
  }

}
