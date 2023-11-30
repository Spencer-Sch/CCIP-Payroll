import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Integration from "../../features/integration";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Integrations" }));
  }, []);

  return <Integration />;
}

export default InternalPage;
