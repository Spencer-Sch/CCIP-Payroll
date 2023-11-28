import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Billing from "../../features/settings/billing";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bills" }));
  }, []);

  return <Billing />;
}

export default InternalPage;
