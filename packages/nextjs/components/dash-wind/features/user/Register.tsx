import { useState } from "react";
import { UpdateFormValues } from "../../types/FormTypes";
import LandingIntro from "./LandingIntro";
import { Address, createWalletClient, custom } from "viem";
import { polygonMumbai } from "viem/chains";
import { setIsConnected } from "~~/auth/authSlice";
import { web3auth } from "~~/auth/web3auth";
import { useMyDispatch } from "~~/components/dash-wind/app/store";
import DeployForm from "~~/components/web-3-crew/register-page/DeployForm";
import EmployeeRegistered from "~~/components/web-3-crew/register-page/EmployeeRegistered";
import RegisterForm from "~~/components/web-3-crew/register-page/RegisterForm";

type RegisterState = "init" | "company-deploy" | "employee-complete" | "loading";

function Register() {
  const INITIAL_REGISTER_OBJ = {
    emailId: "",
  };

  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerState, setRegisterState] = useState<RegisterState>("init");
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
  const [walletAddress, setWalletAddress] = useState<Address | null>(null);

  const dispatch = useMyDispatch();

  async function login() {
    try {
      await web3auth.connect();
      if (web3auth.connected) {
        dispatch(setIsConnected({ isConnected: true }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAccounts() {
    if (!web3auth.provider) {
      console.log("from Register - getAccounts: provider not defined");
      return;
    }
    const client = createWalletClient({
      chain: polygonMumbai,
      transport: custom(web3auth.provider),
    });

    // Get user's public address
    const [address] = await client.getAddresses();
    return address;
  }

  const registerCompany = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage("");

    if (registerObj.emailId.trim() === "") return setErrorMessage("Email is required!");
    else {
      setRegisterState("loading");
      console.log("logging in company...");
      await login();
      // Account Abstraction goes here...?
      console.log("getting account address...");
      const address = await getAccounts();
      if (address) {
        // Prompt user to fund wallet?
        setWalletAddress(address);
        // Prompt use to deploy contract using wallet address
        setRegisterState("company-deploy");
      }
    }
  };

  const registerEmployee = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage("");

    if (registerObj.emailId.trim() === "") return setErrorMessage("Email is required!");
    else {
      setRegisterState("loading");
      console.log("logging in employee...");
      await login();
      // Account Abstraction goes here...?
      const address = await getAccounts();
      if (address) {
        setWalletAddress(address);
        setRegisterState("employee-complete");
      }
    }
  };

  const updateFormValue = ({ updateType, value }: UpdateFormValues) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          {registerState === "loading" && <div>Loading...</div>}
          {registerState === "init" && (
            <RegisterForm
              updateFormValue={updateFormValue}
              registerObj={registerObj}
              // loading={loading}
              errorMessage={errorMessage}
              registerCompany={registerCompany}
              registerEmployee={registerEmployee}
            />
          )}
          {registerState === "company-deploy" && <DeployForm ownerAddress={walletAddress} />}
          {registerState === "employee-complete" && <EmployeeRegistered employeeAddress={walletAddress} />}
        </div>
      </div>
    </div>
  );
}

export default Register;
