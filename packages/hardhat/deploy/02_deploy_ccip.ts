import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Replace these addresses with the actual addresses you want to use
  const routerAddress = "0x70499c328e1e2a3c41108bd3730f6670a44595d1";
  const linkAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

  const TokenTransferor = await ethers.getContractFactory("TokenTransferor");
  const tokenTransferor = await TokenTransferor.deploy(routerAddress, linkAddress);

  await tokenTransferor.deployed();

  console.log("TokenTransferor deployed to:", tokenTransferor.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
