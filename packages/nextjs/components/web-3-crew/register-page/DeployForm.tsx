import React from "react";
import Link from "next/link";
import { Abi, Address, parseEther } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ErrorText from "~~/components/dash-wind/components/Typography/ErrorText";
import { Address as AddressDisplay } from "~~/components/scaffold-eth/Address";

interface props {
  ownerAddress: Address | null;
}

const payrollFactoryAddress = "";
const payrollFactoryABI: Abi = [];

export default function DeployForm({ ownerAddress }: props) {
  /*-------------------------------------*/
  // Kaz & Trevor
  // deploy company contract after registration of account
  const { config } = usePrepareContractWrite({
    address: payrollFactoryAddress,
    abi: payrollFactoryABI,
    functionName: "deployPayrollAndTokenTransferor",
    value: parseEther("1", "wei"),
    onSuccess(data) {
      console.log("contract deployed! Data: ", data);
    },
    onError(error) {
      console.error("contract deploy error!", error);
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  /*-------------------------------------*/

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
              onClick={() => write?.()}
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
