import React, { useEffect, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { themeChange } from "theme-change";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { web3auth } from "~~/auth/web3auth";
// import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";
import { Address } from "~~/components/web-3-crew/Address";

function Header() {
  const dispatch = useMyDispatch();
  const { noOfNotifications, pageTitle } = useMySelector((state: MyState) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") : null,
  );
  const router = useRouter();

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    // 👆 false parameter is required for react project
  }, [currentTheme]);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }));
  };

  async function logoutUser() {
    if (web3auth.connected) {
      await web3auth.logout();
    }
    // TODO
    // set provider to null
    // set logged in state to false
    router.push("/");
  }

  return (
    <>
      <div className="navbar flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <div className="order-last">
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

          {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}

          {/* Light and dark theme selection toggle **/}
          <label className="swap ">
            <input type="checkbox" />
            <SunIcon
              data-set-theme="light"
              data-act-class="ACTIVECLASS"
              className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")}
            />
            <MoonIcon
              data-set-theme="dark"
              data-act-class="ACTIVECLASS"
              className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")}
            />
          </label>

          {/* Notification icon */}
          <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 ? (
                <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span>
              ) : null}
            </div>
          </button>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost">
              <div className="flex justify-center items-center">
                {/* Wallet Address Display */}
                <Address
                  address="0xB9555E2f3e34aDfDB5d033C5af73de6e2385A770"
                  disableAddressLink={true}
                  format="short"
                  size="base"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link href="/dapp/settings-profile">
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="">
                <Link href="/dapp/settings-billing">Bill History</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>

          {/* Profile icon, opening menu on click */}
          {/* <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="flex justify-center items-center rounded-full">
                <UserIcon className="h-6 w-6 inline-block" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link href="/dapp/settings-profile">
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="">
                <Link href="/dapp/settings-billing">Bill History</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Header;
