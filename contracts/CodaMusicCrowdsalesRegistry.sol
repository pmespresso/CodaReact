
pragma solidity ^0.4.19;

import 'openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import './CodaMusicToken.sol';
import './CodaMusicCrowdsale.sol';

contract CodaMusicCrowdsalesRegistry {

  event CrowdsaleDeployed(address crowdsale, address token);

  mapping(address => CodaMusicCrowdsale[]) public owners;

  // user (address => (crowdsale => amount))
  mapping(address => mapping(address => uint256)) public contributions;

  // user (address => (crowdsale => token))
  mapping(address => mapping(address => CodaMusicToken)) public launches;

  function deployCrowdsale(uint256 _rate, address _crowdsaleWallet, CodaMusicToken _token) public returns (address){
    CodaMusicCrowdsale newCodaMusicCrowdsale = (new CodaMusicCrowdsale(_rate, _crowdsaleWallet, _token));
    launches[msg.sender][address(newCodaMusicCrowdsale)] = CodaMusicToken(_token);

    owners[msg.sender].push(newCodaMusicCrowdsale);

    emit CrowdsaleDeployed(newCodaMusicCrowdsale, _token);

    return address(newCodaMusicCrowdsale);
  }

  function getCrowdsalesLengthForUser(address user) public view returns(uint256) {
    return owners[user].length;
  }

  function getCrowdsaleAtIndex(address crowdsale_owner, uint256 crowdsale_index) public view returns(address, address, uint256, uint256) {
    require(crowdsale_owner != address(0));
    require(crowdsale_index >= 0);

    CodaMusicCrowdsale crowdsale = CodaMusicCrowdsale(owners[crowdsale_owner][crowdsale_index]);

    return crowdsale.getDetails();
  }

  function etherBalanceOf(address crowdsale) view returns (uint256) {
    return crowdsale.balance;
  }

  function getWeiRaisedBy(address crowdsale) view returns (uint256) {
    return CodaMusicCrowdsale(crowdsale).getWeiRaised();
  }

  function buy(address crowdsale_address, address beneficiary) public payable {
    CodaMusicCrowdsale(crowdsale_address).buyTokens(beneficiary);
  }
}
