import { FormEvent } from "react";
import BackButton from "../buttons/BackButton";
import { FormSteps } from "~~/pages/dapp";

interface props {
  updateFormState: (value: FormSteps) => void;
}

// interface FormData {
//   companyName: string;
//   companyType: string;
// }

const RegisterCompanyForm = ({ updateFormState }: props) => {
  // const [formData, setFormData] = useState<FormData>({
  //   companyName: "",
  //   companyType: "",
  // });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <BackButton updateFormState={updateFormState} target="signup" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center pt-10 w-1/3">
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input type="text" placeholder="Google" className="input input-bordered w-full max-w-md rounded-lg" />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Company Type</span>
          </label>
          <select className="select select-bordered w-full max-w-md rounded-lg">
            {/* <option disabled selected>
              Select One
            </option> */}
            <option value={"corporation"}>Corporation</option>
            <option value={"partnership"}>Partnership</option>
            <option value={"other"}>Other</option>
          </select>
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text"># of Employees</span>
          </label>
          <input type="number" placeholder="100" className="input input-bordered w-full max-w-md rounded-lg" />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Admin Account</span>
          </label>
          <input type="text" placeholder="0x..." className="input input-bordered w-full max-w-md rounded-lg" />
        </div>

        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Company Fund Public Address</span>
          </label>
          <input type="text" placeholder="0x..." className="input input-bordered w-full rounded-md max-w-md" />
        </div>

        <button type="submit" className="btn-block btn-square btn-primary rounded-lg mt-5 max-w-lg">
          Create Company Account
        </button>
      </form>
    </>
  );
};

export default RegisterCompanyForm;
