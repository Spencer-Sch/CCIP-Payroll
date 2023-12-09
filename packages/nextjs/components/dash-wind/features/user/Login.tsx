import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Payroll from "../../../../../hardhat/artifacts/contracts/Payroll.sol/Payroll.json";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { UpdateFormValues } from "../../types/FormTypes";
import LandingIntro from "./LandingIntro";
import { Address, createWalletClient, custom, isAddress } from "viem";
import { polygonMumbai } from "viem/chains";
// import { Address, createWalletClient, custom } from "viem";
// import { polygonMumbai } from "viem/chains";
import { useConnect, useContractRead } from "wagmi";
import { setIsAdmin, setIsConnected } from "~~/auth/authSlice";
import { web3auth } from "~~/auth/web3auth";
import { useMyDispatch } from "~~/components/dash-wind/app/store";
import { useDebounce } from "~~/components/web-3-crew/hooks/useDebounce";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    contractAddress: "",
  };

  const chainId = //process.env.NEXT_PUBLIC_TARGET_LOCAL_CHAIN ?
    //process.env.NEXT_PUBLIC_LOCAL_CHAIN_ID
    //:
    process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID;

  const payrollABI = Payroll.abi;

  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const debouncedLoginObj = useDebounce<{ contractAddress: string }>(loginObj, 1000);
  const router = useRouter();
  const dispatch = useMyDispatch();
  // state to store user address once it is fetched
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const { connect, connectors, error } = useConnect();

  const updateFormValue = ({ updateType, value }: UpdateFormValues) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value.trim() });
  };

  useEffect(() => {
    // Get user address on render if the account is already logged in
    async function fetchAddress() {
      const address = await getAccounts();
      if (address) {
        setUserAddress(address);
      }
    }
    fetchAddress();
  }, []);

  // getOwner address to test against user's address
  const {
    data: isOwner,
    isLoading: isOwnerLoading,
    isSuccess: isOwnerSuccess,
    isError: isOwnerError,
  }: {
    data: boolean | undefined;
    isLoading: boolean | undefined;
    isSuccess: boolean | undefined;
    isError: boolean | undefined;
  } = useContractRead({
    address: debouncedLoginObj.contractAddress ? debouncedLoginObj.contractAddress : "",
    abi: payrollABI,
    functionName: "isOwner",
    args: userAddress ? [userAddress] : [],
    chainId: Number(chainId),
    onSuccess(data) {
      console.log("useContractRead - isOwner: ", data);
    },
    onError(err) {
      console.error("useContractRead - isOwner: ", err);
    },
  });

  // // this will return a bool from contract as to if the address is an employee true = employee exists
  const {
    data: isEmployee,
    isLoading: isEmployeeLoading,
    isSuccess: isEmployeeSuccess,
    isError: isEmployeeError,
  }: {
    data: boolean | undefined;
    isLoading: boolean | undefined;
    isSuccess: boolean | undefined;
    isError: boolean | undefined;
  } = useContractRead({
    address: debouncedLoginObj.contractAddress ? debouncedLoginObj.contractAddress : "",
    abi: payrollABI,
    functionName: "doesEmployeeExist",
    args: userAddress ? [userAddress] : [],
    chainId: Number(chainId),
    onSuccess(data) {
      console.log("useContractRead - isEmployee: ", data);
    },
    onError(err) {
      console.error("useContractRead - isEmployee: ", err);
    },
  });

  console.log("isOwnerSuccess: ", isOwnerSuccess);
  console.log("isEmployeeSuccess: ", isEmployeeSuccess);

  useEffect(() => {
    console.log("is owner: ", isOwner);
    console.log("is employee: ", isEmployee);
    // console.log("login 8.5");
    if (isOwner) {
      // console.log("login 9");
      dispatch(setIsAdmin({ isAdmin: true }));
      router.push("/dapp/dashboard");
      return;
    }
    if (isEmployee) {
      // console.log("login 10");
      dispatch(setIsAdmin({ isAdmin: false }));
      router.push("/dapp/dashboard");
      return;
    }
    // not owner or employee
    if (isOwner === false && isEmployee === false) {
      dispatch(setIsAdmin({ isAdmin: false }));
      setErrorMessage(
        `Sorry, your account is not currently connected to this contract.
        Double check the contract address and use the same login method you used when registering your account.`,
      );
    }
  }, [isOwnerSuccess, isEmployeeSuccess]);

  useEffect(() => {
    if (loginObj.contractAddress !== "" && !isAddress(loginObj.contractAddress)) {
      setErrorMessage("Value entered is not valid address");
      return;
    }
    // update form error msg is hook comes back with error
    if (isEmployeeSuccess && isEmployeeError) {
      setErrorMessage("Error while checking employee status");
    }
    if (isOwnerSuccess && isOwnerError) {
      setErrorMessage("Error while checking owner status");
    }
  }, [isEmployeeError, isEmployeeSuccess, isOwnerError, isOwnerSuccess]);

  // Wagmi Connect
  async function login() {
    // console.log("login 1");
    try {
      // console.log("login 6");
      await web3auth.connect();
      connect({ connector: connectors[6] });
      if (error) {
        console.error("wagmi connect error: from Login - login(): ", error);
      }
      if (web3auth.connected) {
        // console.log("login 7");
        dispatch(setIsConnected({ isConnected: true }));

        const address = await getAccounts(); // Retrieve user's address
        if (address) {
          // console.log("login 8");
          setUserAddress(address);
          return;
        }
        // ERROR MSG
        setErrorMessage("No account address found");
        ///////////////////////////
        // Previous working logic - without `isEmployee` check
        // if (!isOwner) {
        //   // until the hook is working, this is going to prevent us from being directed to the dashboard
        //   dispatch(setIsAdmin({ isAdmin: false }));
        //   router.push("/dapp/dashboard");
        //   return;
        // }
        // dispatch(setIsAdmin({ isAdmin: true }));
        // router.push("/dapp/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // func to grab the connected wallet address
  async function getAccounts() {
    if (!web3auth.provider) {
      console.log("from login - getAccounts: provider not defined");
      return;
    }
    const client = createWalletClient({
      // account: privateKeyToAccount('0x...'); // from viem
      chain: polygonMumbai,
      transport: custom(web3auth.provider),
    });

    // Get user's public address
    const [userAddress] = await client.getAddresses();
    console.log("user address: ", userAddress);
    return userAddress as Address;
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.contractAddress.trim() === "") return setErrorMessage("Contract Address is required!");
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
              </div>
              <p>isOwner: {isOwner}</p>
              <p>isEmployee: {isEmployee}</p>

              <button
                onClick={login}
                className={"btn btn-block mt-2 btn-primary"}
                disabled={
                  isOwnerLoading ||
                  isEmployeeLoading ||
                  (loginObj.contractAddress !== "" && !isAddress(loginObj.contractAddress))
                }
              >
                {isOwnerLoading || isEmployeeLoading ? (
                  <span className="loading text-primary loading-bars loading-md"></span>
                ) : (
                  "Login"
                )}
              </button>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>

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
