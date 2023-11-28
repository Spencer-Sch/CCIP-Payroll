import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import ProfileSettings from "../../features/settings/profilesettings";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Settings" }));
  }, []);

  return <ProfileSettings />;
}

export default InternalPage;
