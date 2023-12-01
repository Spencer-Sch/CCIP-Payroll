import { useEffect } from "react";
import dynamic from "next/dynamic";
import { removeNotificationMessage } from "../features/common/headerSlice";
import LeftSidebar from "./LeftSidebar";
import ModalLayout from "./ModalLayout";
// import PageContent from "./PageContent";
import RightSidebar from "./RightSidebar";
// import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";

const NotificationContainer = dynamic(
  () => import("react-notifications").then(mod => mod.NotificationContainer),
  { ssr: false }, // This will load the component only on client-side
);

const NotificationManager = dynamic(
  () => import("react-notifications").then(mod => mod.NotificationManager),
  { ssr: false }, // This will load the component only on client-side
);

function Layout() {
  const dispatch = useMyDispatch();
  const { newNotificationMessage, newNotificationStatus } = useMySelector((state: MyState) => state.header);

  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1) (NotificationManager as any).success(newNotificationMessage, "Success");
      if (newNotificationStatus === 0) (NotificationManager as any).error(newNotificationMessage, "Error");
      dispatch(removeNotificationMessage());
    }
  }, [dispatch, newNotificationMessage, newNotificationStatus]);

  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer drawer-mobile">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        {/* <PageContent /> */}
        <LeftSidebar />
      </div>

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />

      {/** Notification layout container */}
      <NotificationContainer />

      {/* Modal layout container */}
      <ModalLayout />
    </>
  );
}

export default Layout;
