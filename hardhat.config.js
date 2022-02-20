require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: process.env.API_URL,
      accounts: [process.env.SECRET_KEY]
    }
  }
};


//ElZNogwtDaOg4jC1Ymt8Mm93XdoGck-N