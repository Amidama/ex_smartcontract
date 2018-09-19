var Test = artifacts.require("./Test.sol");

module.exports = function(deployer) {
  deployer.deploy(Test, {gas: 6700000});
};