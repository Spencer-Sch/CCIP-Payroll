import { useEffect } from "react";
import Calendar from "../../features/calendar";
import { setPageTitle } from "../../features/common/headerSlice";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Calendar" }));
  }, []);

  return <Calendar />;
}

export default InternalPage;
