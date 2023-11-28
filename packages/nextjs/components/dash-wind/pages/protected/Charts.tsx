import { useEffect } from "react";
import Charts from "../../features/charts";
import { setPageTitle } from "../../features/common/headerSlice";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Analytics" }));
  }, []);

  return <Charts />;
}

export default InternalPage;
