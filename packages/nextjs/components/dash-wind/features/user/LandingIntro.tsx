/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className="text-3xl text-center font-bold ">
            {/* <img src="/logo192.png" className="w-12 inline-block mr-2 mask mask-circle" alt="dashwind-logo" /> */}
            Honey Badger HR
          </h1>

          <div className="text-center mt-8">
            <img src="./honey-badger-hr.png" alt="Honey Badger HR logo" className="w-36 inline-block" />
          </div>

          {/* Importing pointers component */}
          <TemplatePointers />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
