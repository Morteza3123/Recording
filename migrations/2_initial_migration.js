const Client = artifacts.require("Client");

module.exports = function (deployer) {
  deployer.deploy(Client);
};
