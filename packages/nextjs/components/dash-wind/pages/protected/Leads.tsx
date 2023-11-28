import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Leads from "../../features/leads";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leads" }));
  }, []);

  return <Leads />;
}

export default InternalPage;
