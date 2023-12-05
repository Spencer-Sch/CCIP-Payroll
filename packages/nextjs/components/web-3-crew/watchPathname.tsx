"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import checkUserAuthentication from "~~/auth/checkUserAuthentication";

export default function WatchPathname() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(`Route changed to: ${pathname}`);
    if (pathname !== null) {
      const userIsAuthenticated = checkUserAuthentication(pathname);
      if (!userIsAuthenticated) {
        router.replace("/login");
      }
    }
  }, [pathname, router]);

  return <></>;
}
