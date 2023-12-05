import { ReactElement, useEffect } from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
import { setIsConnected } from "~~/auth/authSlice";
import { web3auth } from "~~/auth/web3auth";
import { MetaHeader } from "~~/components/MetaHeader";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";
import CleanLayout from "~~/components/layouts/CleanLayout";

const LandingPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useMyDispatch();
  const { isConnected } = useMySelector((state: MyState) => state.auth);

  useEffect(() => {
    if (web3auth.connected) {
      dispatch(setIsConnected({ isConnected: true }));
    }
  }, [dispatch]);

  function launchDapp() {
    if (isConnected) {
      // redirect to dashboard if logged in
      router.push("/dapp/dashboard");
      return;
    }
    // redirect to login if not logged in
    router.push("/login");
  }
  return (
    <>
      <MetaHeader /> {/* Look into MetaHeader - should it be moved to _app.tsx ??? */}
      <div className="flex flex-col items-center pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">CCIP Payroll</span>
          </h1>
        </div>
        <div className="px-5">
          <h2 className="text-center mb-8">
            <span className="block text-3xl font-bold">Web3Crew Constellation Project</span>
          </h2>
        </div>
        <button onClick={launchDapp} className="btn btn-primary rounded-lg">
          Launch Dapp
        </button>
      </div>
    </>
  );
};

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <CleanLayout>{page}</CleanLayout>;
};

export default LandingPage;
