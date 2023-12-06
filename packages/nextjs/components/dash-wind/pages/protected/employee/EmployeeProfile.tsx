import { useEffect } from "react";
import { useMyDispatch } from "~~/components/dash-wind/app/store";
import { setPageTitle } from "~~/components/dash-wind/features/common/headerSlice";
import EmployeeProfile from "~~/components/web-3-crew/employeeProfile/EmployeeProfile";

function InternalPage({ id }: { id: string }) {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Profile" }));
  }, [dispatch]);

  return <EmployeeProfile id={id} />;
}

export default InternalPage;
