import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Employees from "../../features/employees";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Employees" }));
  }, [dispatch]);

  return <Employees />;
}

export default InternalPage;
