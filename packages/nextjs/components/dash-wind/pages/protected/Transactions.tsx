import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Transactions from "../../features/transactions";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Transactions" }));
  }, []);

  return <Transactions />;
}

export default InternalPage;
