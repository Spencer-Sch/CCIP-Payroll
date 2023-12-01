import { ReactElement } from "react";
// import Link from "next/link";
import type { NextPageWithLayout } from "./_app";
import Login from "~~/components/dash-wind/pages/Login";
// import { MetaHeader } from "~~/components/MetaHeader";
import CleanLayout from "~~/components/layouts/CleanLayout";

{
  /* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */
}

const DappLogin: NextPageWithLayout = () => {
  return <Login />;
};

DappLogin.getLayout = function getLayout(page: ReactElement) {
  return <CleanLayout>{page}</CleanLayout>;
};

export default DappLogin;
