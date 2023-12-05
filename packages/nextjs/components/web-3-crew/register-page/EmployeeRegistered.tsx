import React from "react";
import Link from "next/link";
import { Address } from "viem";
import ErrorText from "~~/components/dash-wind/components/Typography/ErrorText";
import { Address as AddressDisplay } from "~~/components/scaffold-eth/Address";

interface props {
  employeeAddress: Address | null;
}

export default function EmployeeRegistered({ employeeAddress }: props) {
  return (
    <div className="py-24 px-10 relative">
      {employeeAddress ? (
        <>
          <h2 className="text-2xl font-semibold mb-2 text-center">Registration Complete!</h2>
          <div className="space-y-8">
            <div className="flex flex-col mt-5">
              <p>Your New Address:</p>
              <AddressDisplay address={employeeAddress} disableAddressLink={true} format="long" size="base" />
            </div>
            <p className="w-full text-center text-xl font-bold text-primary">
              Give this address to your company administrator
            </p>

            <div className="text-center mt-4">
              <Link href="/login">
                <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Go Home
                </span>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2 text-center">Registration Error!</h2>
          <ErrorText styleClass="mt-8">Error: Employee Address Not Found</ErrorText>
          <div className="text-center mt-4">
            <Link href="/login">
              <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                Go Home
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
