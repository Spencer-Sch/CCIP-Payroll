import { ReactElement } from "react";
// import Link from "next/link";
import type { NextPageWithLayout } from "./_app";
import Register from "~~/components/dash-wind/pages/Register";
// import { MetaHeader } from "~~/components/MetaHeader";
import CleanLayout from "~~/components/layouts/CleanLayout";

{
  /* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */
}

const DappRegister: NextPageWithLayout = () => {
  return <Register />;
};

DappRegister.getLayout = function getLayout(page: ReactElement) {
  return <CleanLayout>{page}</CleanLayout>;
};

export default DappRegister;
