import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Payments from "../../features/payments";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Payments" }));
  }, [dispatch]);

  return <Payments />;
}

export default InternalPage;
