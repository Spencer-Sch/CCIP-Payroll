import { ReactElement, useEffect } from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
// import { setIsConnected } from "~~/auth/authSlice";
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
      web3auth.logout();
      // dispatch(setIsConnected({ isConnected: true }));
    }
  }, [dispatch]);

  function launchDapp() {
    if (isConnected) {
      // redirect to dashboard if logged in
      // web3auth.logout();
      // router.push("/dapp/dashboard");
      // return;
    }
    // redirect to login if not logged in
    router.push("/login");
  }
  return (
    <>
      <MetaHeader /> {/* Look into MetaHeader - should it be moved to _app.tsx ??? */}
      <div className="flex items-center justify-center">
        <div className="px-5">
          <img className="hidden sm:block sm:h-[225px]" src="/honey-badger-hr.png" alt="company logo" />
        </div>
        <div className="flex flex-col items-center">
          <div className="px-5">
            <h1 className="text-center mb-12">
              <span className="block text-2xl mb-2">Welcome to</span>
              <span className="block text-4xl font-bold">MVMT Smart Contract</span>
              <span className="block text-2xl mb-2">by</span>
              <span className="block text-3xl font-bold">Honey Badger HR</span>
            </h1>
          </div>
          {/* <div className="px-5 mb-8">
          <img className="h-48" src="/honey-badger-hr.png" alt="company logo" />
        </div> */}
          {/* <div className="px-5">
            <h2 className="text-center mb-8">
              <span className="block text-3xl font-bold">CCIP Enabled Payroll</span>
            </h2>
          </div> */}
          <button onClick={launchDapp} className="btn btn-primary rounded-lg">
            Launch Dapp
          </button>
        </div>
      </div>
    </>
  );
};

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <CleanLayout>{page}</CleanLayout>;
};

export default LandingPage;
