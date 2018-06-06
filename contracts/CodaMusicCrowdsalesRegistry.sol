
pragma solidity ^0.4.19;

import 'openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import './CodaMusicToken.sol';
import './CodaMusicCrowdsale.sol';

contract CodaMusicCrowdsalesRegistry {

  event CrowdsaleDeployed(address crowdsale, address token);

  struct Crowdsale {
    address crowdsale_address;
    address owner_address;
    address token_address;
    uint256 rate;
  }

  mapping(address => Crowdsale[]) public owners;

  // user (address => (crowdsale => amount))
  mapping(address => mapping(address => uint256)) public contributions;

  // user (address => (crowdsale => token))
  mapping(address => mapping(address => CodaMusicToken)) public launches;

  function deployCrowdsale(uint256 _rate, address _crowdsaleWallet, CodaMusicToken _token) public returns (address){
    CodaMusicCrowdsale newCodaMusicCrowdsale = (new CodaMusicCrowdsale(_rate, _crowdsaleWallet, _token));
    launches[msg.sender][address(newCodaMusicCrowdsale)] = CodaMusicToken(_token);

    Crowdsale memory newCrowdsaleStruct = Crowdsale(_crowdsaleWallet, msg.sender, _token, _rate);
    owners[msg.sender].push(newCrowdsaleStruct);

    emit CrowdsaleDeployed(newCodaMusicCrowdsale, _token);
    return address(newCodaMusicCrowdsale);
  }

  function getCrowdsalesLengthForUser(address user) public view returns(uint256) {
    return owners[user].length;
  }

  function getCrowdsaleAtIndex(address addr, uint256 crowdsale_index) public view returns(address, address, address, uint256) {
    return (owners[addr][crowdsale_index].crowdsale_address, owners[addr][crowdsale_index].owner_address, owners[addr][crowdsale_index].token_address, owners[addr][crowdsale_index].rate);
  }

  function balanceOf(address crowdsale, address user) constant returns (uint256) {
    return contributions[user][crowdsale];
  }
}
