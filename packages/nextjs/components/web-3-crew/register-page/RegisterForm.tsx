import React from "react";
import Link from "next/link";
import InputText from "~~/components/dash-wind/components/Input/InputText";
import ErrorText from "~~/components/dash-wind/components/Typography/ErrorText";
import { UpdateFormValues } from "~~/components/dash-wind/types/FormTypes";

interface props {
  updateFormValue: ({ updateType, value }: UpdateFormValues) => void;
  registerObj: { emailId: string };
  loading?: boolean;
  errorMessage: string;
  registerCompany: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  registerEmployee: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function registerForm({
  updateFormValue,
  registerObj,
  loading,
  errorMessage,
  registerCompany,
  registerEmployee,
}: props) {
  return (
    <div className="py-24 px-10">
      <h2 className="text-2xl font-semibold mb-2 text-center">Register</h2>
      <form>
        <div className="mb-4">
          <InputText
            defaultValue={registerObj.emailId}
            updateType="emailId"
            containerStyle="mt-4"
            labelTitle="Email"
            updateFormValue={updateFormValue}
          />
        </div>

        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
        <button
          onClick={e => registerCompany(e)}
          className={"btn mt-2 w-full btn-primary mb-4" + (loading ? " loading" : "")}
        >
          Register as New Company
        </button>
        <button
          onClick={e => registerEmployee(e)}
          className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}
        >
          Register as New Employee
        </button>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login">
            <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              Login
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
