import { ReactElement } from "react";
import Welcome from "../../components/dash-wind/pages/protected/Welcome";
// import { MetaHeader } from "~~/components/MetaHeader";
import CleanLayout from "../../components/layouts/CleanLayout";
// import Link from "next/link";
import type { NextPageWithLayout } from "../_app";

{
  /* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */
}

const DappWelcome: NextPageWithLayout = () => {
  return <Welcome />;
};

DappWelcome.getLayout = function getLayout(page: ReactElement) {
  return <CleanLayout>{page}</CleanLayout>;
};

export default DappWelcome;
