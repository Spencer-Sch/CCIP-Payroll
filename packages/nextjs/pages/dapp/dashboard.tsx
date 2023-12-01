import { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Dashboard from "~~/components/dash-wind/pages/protected/Dashboard";
// import { MetaHeader } from "~~/components/MetaHeader";
import DashLayout from "~~/components/layouts/DashLayout";

{
  /* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */
}

const DappDashboard: NextPageWithLayout = () => {
  return <Dashboard />;
};

DappDashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default DappDashboard;
