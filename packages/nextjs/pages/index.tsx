import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
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
        <Link href="/dapp" className="btn btn-primary">
          Launch Dapp
        </Link>
      </div>
    </>
  );
};

export default Home;
