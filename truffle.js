const config = require("./config/default.json");
const ip = config.deploy.ip_address;
const account = config.deploy.account;

module.exports = {
  networks: {
    development: {
        host: ip,
        port: 8545,
        network_id: "*", // match any network
        from: account,
        gas: 400000
    }
  }
}



