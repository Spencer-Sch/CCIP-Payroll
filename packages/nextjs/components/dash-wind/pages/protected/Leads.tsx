import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Leads from "../../features/leads";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leads" }));
  }, [dispatch]);

  return <Leads />;
}

export default InternalPage;
