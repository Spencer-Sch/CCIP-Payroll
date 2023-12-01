import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Team from "../../features/settings/team";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Team Members" }));
  }, [dispatch]);

  return <Team />;
}

export default InternalPage;
