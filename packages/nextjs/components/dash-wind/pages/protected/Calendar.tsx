import { useEffect } from "react";
import Calendar from "../../features/calendar";
import { setPageTitle } from "../../features/common/headerSlice";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Calendar" }));
  }, []);

  return <Calendar />;
}

export default InternalPage;
