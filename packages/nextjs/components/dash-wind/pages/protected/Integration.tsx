import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Integration from "../../features/integration";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Integrations" }));
  }, []);

  return <Integration />;
}

export default InternalPage;
