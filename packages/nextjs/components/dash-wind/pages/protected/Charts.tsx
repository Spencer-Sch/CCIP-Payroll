import { useEffect } from "react";
import Charts from "../../features/charts";
import { setPageTitle } from "../../features/common/headerSlice";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Analytics" }));
  }, [dispatch]);

  return <Charts />;
}

export default InternalPage;
