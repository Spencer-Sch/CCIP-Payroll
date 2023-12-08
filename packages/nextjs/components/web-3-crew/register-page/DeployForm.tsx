import React, { useState } from "react";
import Link from "next/link";
import PayrollFactory from "../../../../hardhat/artifacts/contracts/PayrollFactory.sol/PayrollFactory.json";
import {
  Address,
  parseEther,
  trim,
  /*parseEther*/
} from "viem";
import { useContractEvent, useContractWrite } from "wagmi";
// import { web3auth } from "~~/auth/web3auth";
import { MyState, useMySelector } from "~~/components/dash-wind/app/store";
import ErrorText from "~~/components/dash-wind/components/Typography/ErrorText";
import { Address as AddressDisplay } from "~~/components/scaffold-eth/Address";

//import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

interface props {
  ownerAddress: Address | null;
}
// Check if the user is connected
// const isConnected = web3auth.connected;
const payrollFactoryAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS;
const payrollFactoryABI = PayrollFactory.abi;

export default function DeployForm({ ownerAddress }: props) {
  //const { data: contractData } = useDeployedContractInfo("PayrollFactory");
  const { isConnected } = useMySelector((state: MyState) => state.auth);
  const [newPayrollContractAddress, setNewPayrollContractAddress] = useState("");
  const [newTokenTransferorContractAddress, setNewTokenTransferorContractAddress] = useState("");

  /*-------------------------------------*/
  // Kaz & Trevor -- think this is the right way to do it
  // but running in browser it seems to always be looking for the connected address
  // see no action in the terminal when the button is clicked
  // deploy company contract after registration of account
  // const { config } = usePrepareContractWrite({
  // usePrepareContractWrite({
  //   address: payrollFactoryAddress,
  //   // abi: contractData?.abi,
  //   abi: payrollFactoryABI,
  //   functionName: "deployPayrollAndTokenTransferor",
  //   args: [],
  //   value: 1_000_000n,
  //   gas: 1_000_000n,
  //   onSuccess(data: any) {
  //     console.log("contract deployed! Data: ", data); //will data be the contract addresses?
  //   },
  //   onError(error: any) {
  //     console.error("contract deploy error!", error); //error message
  //   },
  // });

  // const { data, write, isLoading, isSuccess } = useContractWrite(config);

  //console.log("config: ", config);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: payrollFactoryAddress,
    abi: payrollFactoryABI,
    functionName: "deployPayrollAndTokenTransferor",
    args: [],
    value: parseEther("0.000000000000000001"),
    // value: 100_000_000_000_000_000n,
    onSuccess(data: any) {
      console.log("contract deployed! Data: ", data); //will data be the contract addresses?
    },
    onError(error: any) {
      console.error("contract deploy error!", error); //error message
    },
  });
  // console.log("write: ", write);
  // console.log("data: ", data);

  // Function to handle button click
  const handleDeployClick = () => {
    if (isConnected) {
      console.log("writing...");
      write();
    } else {
      console.log("Wallet not connected");
    }
  };

  useContractEvent({
    address: payrollFactoryAddress,
    abi: payrollFactoryABI,
    eventName: "TokenTransferorDeployed",
    listener(log) {
      console.log("TokenTransferorDeployed: ", trim(log[0].data));
      setNewTokenTransferorContractAddress(trim(log[0].data).toString());
    },
  });
  useContractEvent({
    address: payrollFactoryAddress,
    abi: payrollFactoryABI,
    eventName: "PayrollDeployed",
    listener(log) {
      console.log("PayrollDeployed: ", trim(log[0].data).toString().slice(0, 42));
      setNewPayrollContractAddress(trim(log[0].data).toString().slice(0, 42));
    },
  });
  // 0x5898400727c49fc2453993e017f01f44077e508b; // 42
  // 0xde9e1226a501921472da36c57b9acbe75891bf1
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
              onClick={() => handleDeployClick()}
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
            <AddressDisplay format="long" address={newPayrollContractAddress} />
            <p>Token Transferor Contract Address:</p>
            <AddressDisplay format="long" address={newTokenTransferorContractAddress} />
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
