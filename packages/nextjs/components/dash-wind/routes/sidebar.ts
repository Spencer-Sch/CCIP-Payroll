/** Icons are imported separatly to reduce build time */
// import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
// import BellIcon from "@heroicons/react/24/outline/BellIcon";
// import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
// import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
// import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
// import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
// import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
// import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
// import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
// import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
// import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
// import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
// import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";

// import WalletIcon from "@heroicons/react/24/outline/WalletIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

export const adminRoutes = [
  {
    path: "/dapp/dashboard",
    icon: Squares2X2Icon,
    className: iconClasses,
    name: "Dashboard",
  },
  {
    path: "/dapp/employees", // url
    icon: UsersIcon, // icon component
    className: iconClasses,
    name: "Employees", // name that appear in Sidebar
  },
  {
    path: "/dapp/payments", // url
    icon: CurrencyDollarIcon, // icon component
    className: iconClasses,
    name: "Payments", // name that appear in Sidebar
  },
  // {
  //   path: "/dapp/transactions", // url
  //   icon: CurrencyDollarIcon, // icon component
  //   className: iconClasses,
  //   name: "Transactions", // name that appear in Sidebar
  // },
  // {
  //   path: "/dapp/charts", // url
  //   icon: ChartBarIcon, // icon component
  //   className: iconClasses,
  //   name: "Analytics", // name that appear in Sidebar
  // },
  // {
  //   path: "/dapp/integration", // url
  //   icon: BoltIcon, // icon component
  //   className: iconClasses,
  //   name: "Integration", // name that appear in Sidebar
  // },
  // {
  //   path: "/dapp/calendar", // url
  //   icon: CalendarDaysIcon, // icon component
  //   className: iconClasses,
  //   name: "Calendar", // name that appear in Sidebar
  // },
  {
    path: "", //no url needed as this has submenu
    icon: Cog6ToothIcon, // icon component
    className: `${iconClasses} inline`,
    name: "Settings", // name that appear in Sidebar
    submenu: [
      // {
      //   path: "/dapp/settings-profile", //url
      //   icon: UserIcon, // icon component
      //   className: submenuIconClasses,
      //   name: "Profile", // name that appear in Sidebar
      // },
      // {
      //   path: "/dapp/settings-billing",
      //   icon: WalletIcon,
      //   className: submenuIconClasses,
      //   name: "Billing",
      // },
      // {
      //   path: "/dapp/settings-team", // url
      //   icon: UsersIcon, // icon component
      //   className: submenuIconClasses,
      //   name: "Team Members", // name that appear in Sidebar
      // },
    ],
  },
];
export const userRoutes = [
  {
    path: "/dapp/dashboard",
    icon: Squares2X2Icon,
    className: iconClasses,
    name: "Dashboard",
  },
  // {
  //   path: "/dapp/leads", // url
  //   icon: InboxArrowDownIcon, // icon component
  //   className: iconClasses,
  //   name: "Leads", // name that appear in Sidebar
  // },
  {
    path: "/dapp/payments", // url
    icon: CurrencyDollarIcon, // icon component
    className: iconClasses,
    name: "Payments", // name that appear in Sidebar
  },
  // {
  //   path: "/dapp/transactions", // url
  //   icon: CurrencyDollarIcon, // icon component
  //   className: iconClasses,
  //   name: "Transactions", // name that appear in Sidebar
  // },
  // {
  //   path: "/dapp/charts", // url
  //   icon: ChartBarIcon, // icon component
  //   className: iconClasses,
  //   name: "Analytics", // name that appear in Sidebar
  // },
  // {
  //   path: "/dapp/integration", // url
  //   icon: BoltIcon, // icon component
  //   className: iconClasses,
  //   name: "Integration", // name that appear in Sidebar
  // },
  // {
  //   path: "/dapp/calendar", // url
  //   icon: CalendarDaysIcon, // icon component
  //   className: iconClasses,
  //   name: "Calendar", // name that appear in Sidebar
  // },
  {
    path: "", //no url needed as this has submenu
    icon: Cog6ToothIcon, // icon component
    className: `${iconClasses} inline`,
    name: "Settings", // name that appear in Sidebar
    submenu: [
      {
        path: "/dapp/settings-profile", //url
        icon: UserIcon, // icon component
        className: submenuIconClasses,
        name: "Profile", // name that appear in Sidebar
      },
      // {
      //   path: "/dapp/settings-billing",
      //   icon: WalletIcon,
      //   className: submenuIconClasses,
      //   name: "Billing",
      // },
      // {
      //   path: "/dapp/settings-team", // url
      //   icon: UsersIcon, // icon component
      //   className: submenuIconClasses,
      //   name: "Team Members", // name that appear in Sidebar
      // },
    ],
  },
];

// export default routes;
