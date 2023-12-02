import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { UpdateFormValues } from "../../types/FormTypes";
import LandingIntro from "./LandingIntro";
import { web3auth } from "~~/auth/web3auth";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const router = useRouter();

  // Web3Auth
  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.connect();
        // TODO
        // set provider state (?) already being done in _app.tsx
        // set logged in state to true
        router.push("/dapp/dashboard");
      } catch (error) {
        console.error(error);
      }
    };
    init();
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "") return setErrorMessage("Email Id is required! (use any value)");
    if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)");
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      localStorage.setItem("token", "DumyTokenHere");
      setLoading(false);
      router.push("/dapp/welcome");
      // window.location.href = "/dapp/welcome";
    }
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
                  type="emailId"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link href="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>
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
