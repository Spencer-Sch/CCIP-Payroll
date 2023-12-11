/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
// import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { adminRoutes, userRoutes } from "../routes/sidebar";
// import SidebarSubmenu from "./SidebarSubmenu";
import { MyState, useMySelector } from "~~/components/dash-wind/app/store";

// import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

function LeftSidebar() {
  const router = useRouter();
  const { isAdmin } = useMySelector((state: MyState) => state.auth);

  const routes = isAdmin ? adminRoutes : userRoutes;
  // useEffect(() => {

  // }, [isAdmin])

  // const close = () => {
  //   document.getElementById("left-sidebar-drawer")?.click();
  // };

  return (
    <>
      <div className="drawer-side">
        <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
        <ul className="menu pt-2 w-80 bg-base-100 text-base-content">
          {/* <button
            className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
            onClick={() => close()}
          >
            <XMarkIcon className="h-5 inline-block w-5" />
          </button> */}

          <li className="mb-2 font-semibold text-xl">
            {/* <Link href={"/dapp/welcome"}> */}
            <div className="hover:cursor-default hover:bg-inherit">
              <img className="mask mask-squircle w-10" src="/honey-badger-hr.png" alt="Honey Badger Logo" />
              Honey Badger HR
            </div>
            {/* </Link>{" "} */}
          </li>
          {routes.map((route, k) => {
            return (
              <li className="" key={k}>
                {/* {route.submenu ? (
                  <SidebarSubmenu {...route} />
                ) : ( */}
                <Link legacyBehavior href={route.path}>
                  <a
                    className={
                      router.pathname === route.path ||
                      (route.path === "/dapp/employees" && /\/employee\/./i.test(router.pathname))
                        ? "font-semibold bg-base-200 "
                        : "font-normal"
                    }
                  >
                    {<route.icon className={route.className} />} {route.name}
                    {router.pathname === route.path ||
                    (route.path === "/dapp/employees" && /\/employee\/./i.test(router.pathname)) ? (
                      <span
                        className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                        aria-hidden="true"
                      ></span>
                    ) : null}
                  </a>
                </Link>
                {/* )} */}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default LeftSidebar;
