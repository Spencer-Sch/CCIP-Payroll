import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import ProfileSettings from "../../features/settings/profilesettings";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function InternalPage() {
  const dispatch = useMyDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Settings" }));
  }, [dispatch]);

  return <ProfileSettings />;
}

export default InternalPage;
