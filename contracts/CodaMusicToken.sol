//this standard is based on ethereum
//https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
pragma solidity ^0.4.17;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract CodaMusicToken is StandardBurnableToken, Ownable {

	string public name;
	string public symbol;
	uint256 public decimals;
	uint256 public total_supply;
	uint256 public deployed_time;

	function CodaMusicToken(string _name, string _symbol, uint256 _decimals, uint256 _total_supply) public Ownable() {
		name = _name;
		symbol = _symbol;
		decimals = _decimals;

		deployed_time = now;

		total_supply = _total_supply;

		owner = tx.origin;
	}


}
