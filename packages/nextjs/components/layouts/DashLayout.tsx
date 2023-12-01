import { useEffect } from "react";
import React, { ReactNode } from "react";
// import dynamic from "next/dynamic";
import PageContent from "../dash-wind/containers/PageContent";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";
import LeftSidebar from "~~/components/dash-wind/containers/LeftSidebar";
import ModalLayout from "~~/components/dash-wind/containers/ModalLayout";
import RightSidebar from "~~/components/dash-wind/containers/RightSidebar";
import { removeNotificationMessage } from "~~/components/dash-wind/features/common/headerSlice";

interface DashLayoutProps {
  children: ReactNode;
}

export default function DashLayout({ children }: DashLayoutProps) {
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
      <div className="drawer drawer-mobile lg:drawer-open">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <PageContent>{children}</PageContent>
        <LeftSidebar />
      </div>

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />

      {/** Notification layout container */}
      <NotificationContainer />

      {/* Modal layout container */}
      <ModalLayout />
      <div className="relative flex flex-col justify-center flex-1"></div>
    </>
  );
}
