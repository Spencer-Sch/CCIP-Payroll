import { FormSteps } from "~~/components/web-3-crew/types/FormSteps";

interface props {
  updateFormState: (value: FormSteps) => void;
}

const ExistingOrNewMember = ({ updateFormState }: props) => {
  return (
    <div className="flex items-center justify-center pt-10 space-x-5">
      <button
        onClick={() => updateFormState("login")}
        className="btn btn-primary card w-96 h-96 hover:shadow-xl transition-shadow"
      >
        <span className="flex flex-col items-center pt-10">
          <span className="text-4xl">Existing</span>
          <span className="underline text-4xl">Member?</span>
        </span>
        <p className="text-xl">&#40;Attach Wallet&#41;</p>
      </button>
      <button
        onClick={() => updateFormState("signup")}
        className="btn btn-primary card w-96 h-96 hover:shadow-xl transition-shadow"
      >
        <span className="flex flex-col items-center pt-10">
          <span className="text-4xl">New</span>
          <span className="underline text-4xl">Member?</span>
        </span>
        <p className="text-xl">&#40;Create Account&#41;</p>
      </button>
    </div>
  );
};

export default ExistingOrNewMember;
