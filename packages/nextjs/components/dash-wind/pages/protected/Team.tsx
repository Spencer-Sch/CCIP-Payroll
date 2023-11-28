import { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import Team from "../../features/settings/team";
import { useDispatch } from "react-redux";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Team Members" }));
  }, []);

  return <Team />;
}

export default InternalPage;
