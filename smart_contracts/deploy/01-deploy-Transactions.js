const { devChain } = require("../helper-hardhat-config"); // Import helper config
require("dotenv").config();
const hre = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async () => {
  const transactionFactory = await hre.ethers.getContractFactory("Transaction");

  const transactionContract = await transactionFactory.deploy();

  console.log("\n------------Network detected---------------");
  console.log("Deploying.............");
  await transactionContract.deploymentTransaction().wait(5);
  await transactionContract.waitForDeployment();

  console.log("Deployed Contract At: ", transactionContract.target);

  if (!devChain.includes(network.name) && process.env.ETHERSCAN_API) {
    await verify(transactionContract.target, []); //Verify for transparency
  }

  console.log(
    "----------------------------Deploy/Verify Successful--------------------------------"
  );
};

module.exports.tags = ["all", "Transaction"];
