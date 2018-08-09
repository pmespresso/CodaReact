pragma solidity ^0.4.24;
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

  // DEV ONLY
  address ceo = address(0x2E5C5c5e122c0A41Da6c3C1bD4e2F95AC714d9d7);

  /* mapping (user address => token addresses) public owners; */
  mapping (address => address[]) public owners;
  //mapping of token addresses to mapping of accounts to their balances (token=0 means Ether)
  mapping (address => mapping (address => uint256)) public token_balances;

  /* one to one mapping of token to owner */
  mapping(address => address) public tokenToOwner;

  // DEV ONLY
  modifier onlyCEO(address callerAddress) {
    require(callerAddress == ceo, "Only the CEO can call this function");
    _;
  }

  modifier onlyTokenOwner(address ownerAddress, address tokenAddress) {
    bool tokenFound = false;
    for (uint256 i = 0; i < owners[ownerAddress].length; i++) {
      if (owners[ownerAddress][i] == tokenAddress) {
        tokenFound = true;
      }
    }
    require(tokenFound, "only the token owner can call this function. Check you are logged into the correct account and try again.");
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

  function burnToken(address _token, uint256 _value) public onlyTokenOwner(msg.sender, _token) {
    CodaMusicToken(_token).burn(_value);
  }

  function transferOwnership(address _token, address _newOwner) public {
    CodaMusicToken(_token).transferOwnership(_newOwner);
  }

  function mint(address _token, address _to, uint256 _value) public returns (bool) {
    return CodaMusicToken(_token).mint(_to, _value);
  }

}
