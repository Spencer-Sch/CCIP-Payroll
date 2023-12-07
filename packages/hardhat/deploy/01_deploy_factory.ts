// Import ethers from Hardhat package
import { ethers, run } from "hardhat";

async function main() {
  // Retrieve the signers
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the PayrollFactory contract
  // Ensure you have the correct addresses for router, linkToken, and paymentToken
  const routerAddress = "0x70499c328e1e2a3c41108bd3730f6670a44595d1"; // CCIP Router Mumbai
  const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; // LINK token Mumbai
  const paymentTokenAddress = "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40"; //BnM Mumbai

  const PayrollFactory = await ethers.getContractFactory("PayrollFactory");
  const payrollFactory = await PayrollFactory.deploy(routerAddress, linkTokenAddress, paymentTokenAddress);

  await payrollFactory.deployed();

  console.log("PayrollFactory deployed to:", payrollFactory.address);

  // Verify the contract after deployment
  try {
    console.log("Verifying contract...");
    await run("verify:verify", {
      address: payrollFactory.address,
      constructorArguments: [routerAddress, linkTokenAddress, paymentTokenAddress],
    });
    console.log("Verification done.");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
