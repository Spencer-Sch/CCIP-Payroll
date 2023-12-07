import { ethers } from "hardhat";

async function main() {
  // Get the signers
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Add the addresses of the dependencies of your Payroll contract
  const ccipTokenTransferorAddress = "0xFFc15127eB60C4Ab1a2e5e0319615ca0982952f2"; // deployed via script
  const bnmTokenAddress = "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40"; //BnM Mumbai

  // Deploy the Payroll contract
  const Payroll = await ethers.getContractFactory("Payroll");
  const payroll = await Payroll.deploy(ccipTokenTransferorAddress, bnmTokenAddress);

  await payroll.deployed();

  console.log("Payroll deployed to:", payroll.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
