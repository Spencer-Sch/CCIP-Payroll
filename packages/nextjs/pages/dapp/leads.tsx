import { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Leads from "~~/components/dash-wind/pages/protected/Leads";
// import { MetaHeader } from "~~/components/MetaHeader";
import DashLayout from "~~/components/layouts/DashLayout";

{
  /* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */
}

const DappDashboard: NextPageWithLayout = () => {
  return <Leads />;
};

DappDashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default DappDashboard;
