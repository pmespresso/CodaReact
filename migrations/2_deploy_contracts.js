
var CodaMusicToken = artifacts.require("CodaMusicToken");
var CodaMusicTokensRegistry = artifacts.require("CodaMusicTokensRegistry");

var CodaMusicCrowdsale = artifacts.require("CodaMusicCrowdsale");
var CodaMusicCrowdsalesRegistry = artifacts.require("CodaMusicCrowdsalesRegistry");

module.exports = function(deployer) {
  deployer.deploy(CodaMusicTokensRegistry);
  deployer.link(CodaMusicTokensRegistry, CodaMusicToken);

  deployer.deploy(CodaMusicCrowdsalesRegistry);
  deployer.link(CodaMusicCrowdsalesRegistry, CodaMusicCrowdsale);
};
