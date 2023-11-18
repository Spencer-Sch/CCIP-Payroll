import BackButton from "./buttons/BackButton";
import { FormSteps } from "~~/pages/dapp";

interface props {
  updateFormState: (value: FormSteps) => void;
}

const LoginEmailOrWallet = ({ updateFormState }: props) => {
  return (
    <>
      <BackButton updateFormState={updateFormState} target="start" />
      {/* Main Buttons */}
      <div className="flex items-center justify-center pt-10 space-x-5">
        <button
          // onClick={/* Trigger login with wallet */}
          className="btn card w-96 h-96 bg-primary hover:shadow-xl transition-shadow"
        >
          <span className="flex flex-col text-4xl items-center pt-10">Login with Email</span>
        </button>
        <button
          // onClick={/* Trigger login with wallet */}
          className="btn card w-96 h-96 bg-primary hover:shadow-xl transition-shadow"
        >
          <span className="flex flex-col text-4xl items-center pt-10">Login with Wallet</span>
        </button>
      </div>
    </>
  );
};

export default LoginEmailOrWallet;
