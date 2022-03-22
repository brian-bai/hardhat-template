require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('solidity-coverage');
require('dotenv').config();
//user defined tasks
require('./scripts/tasks');

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    // hardhat: {
      
    // },
    mumbai: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true,
    }
  },
  solidity: "0.8.4",
};
