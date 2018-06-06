
var CodaMusicToken = artifacts.require("CodaMusicToken");
var CodaMusicTokenRegistry = artifacts.require("CodaMusicTokensRegistry");

var CodaMusicCrowdsale = artifacts.require("CodaMusicCrowdsale");
var CodaMusicCrowdsalesRegistry = artifacts.require("CodaMusicCrowdsalesRegistry");

// var AbstractCodaToken = artifacts.require("AbstractCodaToken");
// var EIP20Factory = artifacts.require("EIP20Factory");

module.exports = function(deployer) {

  deployer.deploy(CodaMusicTokenRegistry);
  deployer.link(CodaMusicTokenRegistry, CodaMusicToken);
  deployer.deploy(CodaMusicToken, "Coda Music Token", "CODA", 18, 10000000);

  deployer.deploy(CodaMusicCrowdsalesRegistry);
  deployer.link(CodaMusicCrowdsalesRegistry, CodaMusicCrowdsale);
};
