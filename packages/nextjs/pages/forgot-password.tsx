import { ReactElement } from "react";
// import Link from "next/link";
import type { NextPageWithLayout } from "./_app";
import ForgotPassword from "~~/components/dash-wind/pages/ForgotPassword";
// import { MetaHeader } from "~~/components/MetaHeader";
import CleanLayout from "~~/components/layouts/CleanLayout";

{
  /* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */
}

const DappForgotPassword: NextPageWithLayout = () => {
  return <ForgotPassword />;
};

DappForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <CleanLayout>{page}</CleanLayout>;
};

export default DappForgotPassword;
