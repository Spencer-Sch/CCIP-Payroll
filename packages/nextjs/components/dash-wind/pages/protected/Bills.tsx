import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Billing from "../../features/settings/billing";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bills" }));
  }, []);

  return <Billing />;
}

export default InternalPage;
