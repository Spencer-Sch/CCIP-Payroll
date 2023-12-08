import React from "react";
import Link from "next/link";
import PayrollFactory from "../../../../hardhat/artifacts/contracts/PayrollFactory.sol/PayrollFactory.json";
import { Address, parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { web3auth } from "~~/auth/web3auth";
import ErrorText from "~~/components/dash-wind/components/Typography/ErrorText";
import { Address as AddressDisplay } from "~~/components/scaffold-eth/Address";

//import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

interface props {
  ownerAddress: Address | null;
}
// Check if the user is connected
const isConnected = web3auth.connected;
const payrollFactoryAddress = "0xfe44aB0B966E57F126130BE6401546c7351484ad";
const payrollFactoryABI = PayrollFactory.abi;

export default function DeployForm({ ownerAddress }: props) {
  //const { data: contractData } = useDeployedContractInfo("PayrollFactory");

  /*-------------------------------------*/
  // Kaz & Trevor -- think this is the right way to do it
  // but running in browser it seems to always be looking for the connected address
  // see no action in the terminal when the button is clicked
  // deploy company contract after registration of account
  // const { config } = usePrepareContractWrite({
  //   address: payrollFactoryAddress,
  //   // abi: contractData?.abi,
  //   abi: payrollFactoryABI,
  //   functionName: "deployPayrollAndTokenTransferor",
  //   value: parseEther("1", "wei"),
  //   onSuccess(data) {
  //     console.log("contract deployed! Data: ", data); //will data be the contract addresses?
  //   },
  //   onError(error) {
  //     console.error("contract deploy error!", error); //error message
  //   },
  // });

  //console.log("config: ", config);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: payrollFactoryAddress,
    abi: payrollFactoryABI,
    functionName: "deployPayrollAndTokenTransferor",
  });
  console.log("write: ", write);
  console.log("data: ", data);

  // Function to handle button click
  const handleDeployClick = () => {
    if (isConnected) {
      write({
        args: [],
        //from: ownerAddress,
        value: parseEther("1", "wei"),
      });
    } else {
      console.log("Wallet not connected");
    }
  };

  return (
    <div className="py-24 px-10 relative">
      <h2 className="text-2xl font-semibold mb-2 text-center">Deploy Payroll Contract</h2>
      <div className="space-y-8">
        {ownerAddress ? (
          <>
            <div className="flex flex-col mt-5">
              <p>Account Owner Address:</p>
              <AddressDisplay address={ownerAddress} disableAddressLink={true} format="long" size="base" />
            </div>
            {/* <button onClick={() => writeAsync()} className="btn mt-2 w-full btn-primary mb-4"> */}
            <button
              // onClick={() =>
              //   write({
              //     args: [],
              //     //from: ownerAddress,
              //     value: parseEther("1", "wei"),
              //   })
              // }
              onClick={handleDeployClick}
              disabled={isLoading || isSuccess ? true : false}
              className={"btn mt-2 w-full btn-primary mb-4" + (isLoading ? " loading" : "")}
            >
              Deploy Contract
            </button>
          </>
        ) : (
          <ErrorText styleClass="mt-8">Error: Owner Address Not Found</ErrorText>
        )}

        {data && (
          <div className="flex flex-col mt-5">
            <p>Payroll Contract Address:</p>
            {/* <p>{data}</p> */}
            {/* <AddressDisplay address={contractAddress} format="long" size="base" /> */}
          </div>
        )}

        <div className="text-center mt-4">
          <Link href="/login">
            <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              Go Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
