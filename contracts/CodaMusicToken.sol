//this standard is based on ethereum
//https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
pragma solidity ^0.4.17;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract CodaMusicToken is StandardBurnableToken, Ownable {

	string public name;
	string public symbol;
	address public owner;
	uint256 public decimals;
	uint256 public deployedTime_;

	function CodaMusicToken(string _name, string _symbol, uint256 _decimals, uint256 _total_supply) public Ownable() {
		balances[msg.sender] = _total_supply; // this sets the registry to own all the tokens

		name = _name;
		symbol = _symbol;
		decimals = _decimals;
		totalSupply_ = _total_supply;
		deployedTime_ = now;
		owner = tx.origin;
	}

	function getDetails() public view returns (string, string, address, address, uint256, uint256, uint256) {
		return (name, symbol, owner, address(this), decimals, deployedTime_, totalSupply_);
	}
}
