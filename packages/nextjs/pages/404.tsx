import React, { lazy } from "react";

const Page404 = lazy(() => import("~~/components/dash-wind/pages/protected/_404"));

function fourOhFour() {
  return <Page404 />;
}

export default fourOhFour;
