require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
const { INFURA, PRIVATE_KEY, ETHERSCAN_API_KEY} = process.env;

module.exports = {
  solidity: {
  	version: "0.8.17",
  	setting: {
  		optimizer: {
  			enabled: true,
  			runs: 200
  		}
  	}
  },
  defaultNetwork: "hardhat",
  paths: {
  	artifacts: './src/artifacts'
  },
  networks: {
  	goerli: {
  		url: INFURA,
  		accounts:[ `0x${PRIVATE_KEY}`],
  		chainId: 5 
  	},
  	localhost: {
  		url:"http://127.0.0.1:8545",
  		//accounts provided by hardhat
  		chainId: 31337
  	}
  },
  etherscan: {
  	apiKey: {
  		goerli: ETHERSCAN_API_KEY
  	}
  },
  gasReporter: {
  	enabled: true
  } 
};
