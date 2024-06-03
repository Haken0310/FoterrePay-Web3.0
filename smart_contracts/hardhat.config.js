require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
const COINMARKETCAP_API = process.env.COINMARKETCAP_API;

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.18" },
      { version: "0.6.6" },
      { version: "0.6.0" },
      { version: "0.8.0" },
      { version: "0.8.20" },
    ],
  },

  defaultNetwork: "hardhat",

  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [ADMIN_PRIVATE_KEY],
      chainId: 11155111, //chainlist.org
      blockConfirmations: 6,
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API,
  },

  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    currency: "MYR",
    coinmarketcap: COINMARKETCAP_API,
  },

  paths: {
    sources: "./contracts",
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
