import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { UpdateFormValues } from "../../types/FormTypes";
import LandingIntro from "./LandingIntro";
import { setIsConnected } from "~~/auth/authSlice";
import { web3auth } from "~~/auth/web3auth";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    contractAddress: "",
    emailId: "",
  };

  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const { isConnected } = useMySelector((state: MyState) => state.auth);

  const router = useRouter();
  const dispatch = useMyDispatch();

  // Web3Auth
  async function login() {
    if (isConnected) {
      router.push("/dapp/dashboard");
    }
    try {
      await web3auth.connect();
      if (web3auth.connected) {
        dispatch(setIsConnected({ isConnected: true }));
        router.push("/dapp/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

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
