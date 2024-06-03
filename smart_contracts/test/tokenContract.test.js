const { expect } = require("chai");
const hre = require("hardhat");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("FoterreToken contract", function () {
  let Token;
  let foterreToken;
  let add1;
  let add2;
  let recipient;
  let tokenCap = 150000000000;
  let tokenBlockReward = 50;

  beforeEach(async function () {
    Token = await hre.ethers.getContractFactory("FoterreToken");
    [oener, add1, add2] = await hre.ethers.getSigner();

    foterreToken = await Token.deploy(tokenCap);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await foterreToken.owner()).to.equal(owner.target);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await foterreToken.balanceOf(owner.address);
      expect(await foterreToken.totalSupply()).to.equal(ownerBalance);
    });
    it("Should have a total supply of 150,000,000,000", async function () {
      expect(await foterreToken.totalSupply()).to.equal(
        hre.ethers.utils.parseEther("150000000000")
      );
    });
  });

  describe("Transaction", function () {
    it("Should transfer tokens between accounts", async function () {
      //Tansfer 100 tokens from owner to address 1
      await foterreToken.transfer(add1.address, 100);
      const add1Balance = await foterreToken.balanceOf(add1.address);
      expect(add1Balance).to.equal(100);

      //Transfer 80 tokens from address 1 to address 2
      await foterreToken.connect(add1).transfer(add2.address, 80);
      const add2Balance = await foterreToken.balanceOf(add2.address);
      expect(add2Balance).to.equal(80);
      expect(add1Balance).to.equal(20);
    });
    it("Should fail if sender doesnt have enough tokens", async function () {
      const initialOwnerBalance = await foterreToken.balanceOf(owner.address);
    });
  });
});
