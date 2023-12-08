import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { UpdateFormValues } from "../../types/FormTypes";
import LandingIntro from "./LandingIntro";
// import { Address, createWalletClient, custom } from "viem";
// import { polygonMumbai } from "viem/chains";
import { useContractRead } from "wagmi";
import {
  /*setIsAdmin,*/
  setIsConnected,
} from "~~/auth/authSlice";
import { web3auth } from "~~/auth/web3auth";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    contractAddress: "",
    emailId: "",
  };

  const chainId = process.env.NEXT_PUBLIC_TARGET_LOCAL_CHAIN
    ? process.env.NEXT_PUBLIC_LOCAL_CHAIN_ID
    : process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID;

  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const { isConnected } = useMySelector((state: MyState) => state.auth);

  const router = useRouter();
  const dispatch = useMyDispatch();

  /*-------------------------------------*/
  // Kaz & Trevor
  // getOwner address to test against user's address
  // need to see what shape `owner` will be on return
  const {
    data: owner,
    // isError,
    // isLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
    // abi: payrollContractAbi,
    functionName: "getOwner",
    chainId: Number(chainId),
  });
  /*-------------------------------------*/

  /*-------------------------------------*/
  // Kaz & Trevor
  //
  const {
    data: isEmployee,
    // isError,
    // isLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
    // abi: payrollContractAbi,
    functionName: "doesEmployeeExist",
    args: [
      /* problem: figure out how to getAccount() address here */
    ],
    chainId: Number(chainId),
  });
  /*-------------------------------------*/

  // Web3Auth
  async function login() {
    if (isConnected) {
      await determineIfAccountIsAdmin();
      if (!isEmployee) {
        // until the hook is working, this is going to prevent us from being directed to the dashboard
        return;
      }
      router.push("/dapp/dashboard");
      return;
    }

    try {
      await web3auth.connect();
      if (web3auth.connected) {
        dispatch(setIsConnected({ isConnected: true }));
        // await determineIfAccountIsAdmin();
        // if (!isEmployee) {
        //   // until the hook is working, this is going to prevent us from being directed to the dashboard
        //   return;
        // }
        router.push("/dapp/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function determineIfAccountIsAdmin() {
    // set loading === true ???
    // const address = await getAccounts();
    // if (!address) {
    //   console.error("from determineIfAccountIsAdmin - address is undefined");
    //   return;
    // }

    if (!owner) {
      console.error("From determineIfAccountIsAdmin: ownerData from Payroll Contract is undefined");
      return;
    }

    /*-------------------------------------*/
    // Kaz & Trevor
    // need to see what shape `owner` will be on return
    // const isAdmin = address === owner ? true : false;
    // dispatch(setIsAdmin({ isAdmin: isAdmin }));
    /*-------------------------------------*/
    // set loading === false ???
  }

  // async function getAccounts() {
  //   if (!web3auth.provider) {
  //     console.log("from login - getAccounts: provider not defined");
  //     return;
  //   }
  //   const client = createWalletClient({
  //     // account: privateKeyToAccount('0x...'); // from viem
  //     chain: polygonMumbai,
  //     transport: custom(web3auth.provider),
  //   });

  //   // Get user's public address
  //   const [address] = await client.getAddresses();
  //   return address as Address;
  // }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "") return setErrorMessage("Email is required!");
    if (loginObj.contractAddress.trim() === "") return setErrorMessage("Contract Address is required!");
  };

  const updateFormValue = ({ updateType, value }: UpdateFormValues) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={e => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  defaultValue={loginObj.contractAddress}
                  updateType="contractAddress"
                  containerStyle="mt-4"
                  labelTitle="Contract Address"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="emailId"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={updateFormValue}
                />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button onClick={login} className="btn mt-2 w-full btn-primary">
                Login
              </button>

              <div className="text-center mt-4">
                Don&apos;t have an account yet?{" "}
                <Link href="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
