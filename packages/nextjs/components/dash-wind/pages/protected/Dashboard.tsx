import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Dashboard from "../../features/dashboard/index";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Dashboard" }));
  }, []);

  return <Dashboard />;
}

export default InternalPage;
