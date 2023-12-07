import React, { useEffect, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";
import { themeChange } from "theme-change";
import { Address, createWalletClient, custom } from "viem";
import { polygonMumbai } from "viem/chains";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { setIsConnected } from "~~/auth/authSlice";
import { web3auth } from "~~/auth/web3auth";
// import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";
import { Address as AddressDisplay } from "~~/components/web-3-crew/Address";

function Header() {
  const dispatch = useMyDispatch();
  const { noOfNotifications, pageTitle } = useMySelector((state: MyState) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") : null,
  );
  const [address, setAddress] = useState<Address | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getAddress() {
      const address = await getAccounts();
      if (address) {
        setAddress(address);
      }
    }
    getAddress();
  }, []);

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

  async function getAccounts() {
    if (!web3auth.provider) {
      console.log("from login - getAccounts: provider not defined");
      return;
    }
    const client = createWalletClient({
      // account: privateKeyToAccount('0x...'); // from viem
      chain: polygonMumbai,
      transport: custom(web3auth.provider),
    });

    // Get user's public address
    const [address] = await client.getAddresses();
    return address as Address;
  }

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }));
  };

  async function logoutUser() {
    await web3auth.logout();
    dispatch(setIsConnected({ isConnected: false }));
    router.push("/login");
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
                <AddressDisplay address={address?.toString()} disableAddressLink={true} format="short" size="base" />
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
