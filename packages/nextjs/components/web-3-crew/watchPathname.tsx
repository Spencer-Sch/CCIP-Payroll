"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import checkUserAuthentication from "~~/auth/checkUserAuthentication";
import { MyState, useMySelector } from "~~/components/dash-wind/app/store";

export default function WatchPathname() {
  const pathname = usePathname();
  const router = useRouter();
  const { isConnected } = useMySelector((state: MyState) => state.auth);

  useEffect(() => {
    // console.log(`Route changed to: ${pathname}`);
    if (pathname !== null) {
      const userIsAuthenticated = checkUserAuthentication(pathname, isConnected);
      if (!userIsAuthenticated) {
        router.replace("/login");
      }
    }
  }, [pathname, router, isConnected]);

  return <></>;
}
