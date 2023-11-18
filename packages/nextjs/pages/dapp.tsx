import { ReactElement, useState } from "react";
// import Link from "next/link";
import type { NextPageWithLayout } from "./_app";
// import { MetaHeader } from "~~/components/MetaHeader";
import CleanLayout from "~~/components/layouts/CleanLayout";
import ExistingOrNewMember from "~~/components/web-3-crew/ExistingOrNewMember";
import LoginEmailOrWallet from "~~/components/web-3-crew/LoginEmailOrWallet";
import RegisterCompanyOrEmployee from "~~/components/web-3-crew/RegisterCompanyOrEmployee";

export type FormSteps = "start" | "login" | "signup" | "register-company" | "register-employee";

const LandingPage: NextPageWithLayout = () => {
  const [formState, setFormState] = useState<FormSteps>("start");

  function updateFormState(value: FormSteps) {
    setFormState(value);
  }

  return (
    <>
      {/* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */}
      {/* Container */}
      <div className="flex flex-col items-center pt-10">
        {/* Form container */}
        <div className="card w-5/6 p-10 bg-secondary shadow-xl relative">
          {/* Initial Options */}
          {(formState === "start" || formState === "login") && (
            <>
              <div className="px-5">
                <h1 className="text-center mb-8 block text-4xl font-bold">CCIP Payroll</h1>
              </div>
              {formState === "start" && <ExistingOrNewMember updateFormState={updateFormState} />}
              {formState === "login" && <LoginEmailOrWallet updateFormState={updateFormState} />}
            </>
          )}

          {/* Signup Options */}
          {formState === "signup" && (
            <>
              <div className="px-5">
                <h2 className="text-center mb-4 block text-3xl font-bold">
                  Are you registering as a company or employee?
                </h2>
              </div>
              <RegisterCompanyOrEmployee updateFormState={updateFormState} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <CleanLayout>{page}</CleanLayout>;
};

export default LandingPage;
