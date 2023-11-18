import { FormEvent } from "react";
import BackButton from "../buttons/BackButton";
import { FormSteps } from "~~/pages/dapp";

interface props {
  updateFormState: (value: FormSteps) => void;
}

const RegisterEmployeeForm = ({ updateFormState }: props) => {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <>
      <BackButton updateFormState={updateFormState} target="signup" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center pt-10 w-1/3">
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input type="text" placeholder="John" className="input input-bordered w-full max-w-md rounded-lg" />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input type="text" placeholder="Doe" className="input input-bordered w-full max-w-md rounded-lg" />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Wallet Address</span>
          </label>
          <input type="text" placeholder="0x..." className="input input-bordered w-full max-w-md rounded-lg" />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Employee ID</span>
          </label>
          <input type="text" placeholder="5001" className="input input-bordered w-full max-w-md rounded-lg" />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Company Contract Address</span>
          </label>
          <input type="text" placeholder="0x..." className="input input-bordered w-full max-w-md rounded-lg" />
        </div>

        {/* <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Frequency of Payment</span>
          </label>
          <select className="select select-bordered w-full max-w-md rounded-lg">
            <option value={"weekly"}>Weekly</option>
            <option value={"bi-monthly"}>Bi-Monthly</option>
            <option value={"other"}>Other</option>
          </select>
        </div> */}

        <button type="submit" className="btn-block btn-square btn-primary rounded-lg mt-5 max-w-lg">
          Create Employee Account
        </button>
      </form>
    </>
  );
};

export default RegisterEmployeeForm;
