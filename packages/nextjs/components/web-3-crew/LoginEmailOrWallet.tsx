import { FormSteps } from "~~/pages/dapp";

interface props {
  updateFormState: (value: FormSteps) => void;
}

const LoginEmailOrWallet = ({ updateFormState }: props) => {
  return (
    <>
      {/* Back Button */}
      <button onClick={() => updateFormState("start")} className="btn btn-square btn-outline absolute">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
      </button>
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
