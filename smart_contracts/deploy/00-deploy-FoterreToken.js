const { devChain } = require("../helper-hardhat-config"); // Import helper config
const hre = require("hardhat");
require("dotenv").config();
const { verify } = require("../utils/verify");

module.exports = async () => {
  const tokenFactory = await hre.ethers.getContractFactory("FoterreToken");
  const tokenContract = await tokenFactory.deploy(150000000000);

  console.log("\n------------Network detected---------------");
  console.log("Deploying.............");
  await tokenContract.deploymentTransaction().wait(5);
  await tokenContract.waitForDeployment();

  console.log("Deployed Contract At: ", tokenContract.target);

  if (!devChain.includes(network.name) && process.env.ETHERSCAN_API) {
    await verify(tokenContract.target, [150000000000]); //Verify for transparency
  }

  console.log(
    "----------------------------Deploy/Verify Successful--------------------------------"
  );
};

module.exports.tags = ["all", "FoterreToken"];
