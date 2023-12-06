import { ReactElement } from "react";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "../../_app";
import EmployeeProfile from "~~/components/dash-wind/pages/protected/employee/EmployeeProfile";
// import { MetaHeader } from "~~/components/MetaHeader";
import DashLayout from "~~/components/layouts/DashLayout";

{
  /* <MetaHeader /> Look into MetaHeader - should it be moved to _app.tsx ??? */
}

const DappDashboard: NextPageWithLayout = () => {
  const router = useRouter();
  const slug = router.query.id as string;

  return <EmployeeProfile id={slug} />;
};

DappDashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashLayout>{page}</DashLayout>;
};

export default DappDashboard;
