import { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Bills from "~~/components/dash-wind/pages/protected/Bills";
// import { MetaHeader } from "~~/components/MetaHeader";
import DashLayout from "~~/components/layouts/DashLayout";

{
  /* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */
}

const DappDashboard: NextPageWithLayout = () => {
  return <Bills />;
};

DappDashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default DappDashboard;
