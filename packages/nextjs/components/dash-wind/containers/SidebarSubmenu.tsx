import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";

interface SubmenuItem {
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  name: string;
}

interface SidebarSubmenuProps {
  submenu: SubmenuItem[];
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

function SidebarSubmenu({ submenu, name, icon, className }: SidebarSubmenuProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  /** Open Submenu list if path found in routes, this is for directly loading submenu routes  first time */
  useEffect(() => {
    if (
      submenu.filter(m => {
        return m.path === router.pathname;
      })[0]
    )
      setIsExpanded(true);
  }, [router.pathname, submenu]);

  return (
    <div className="flex-col">
      {/** Route header */}
      <div className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
        {React.createElement(icon, { className })} {name}
        <ChevronDownIcon
          className={
            "w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all  " + (isExpanded ? "rotate-180" : "")
          }
        />
      </div>

      {/** Submenu list */}
      <div className={` w-full ` + (isExpanded ? "" : "hidden")}>
        <ul className={`menu menu-compact`}>
          {submenu.map((m, k) => {
            return (
              <li key={k}>
                <Link href={m.path}>
                  {React.createElement(m.icon, { className: m.className })} {m.name}
                  {router.pathname == m.path ? (
                    <span
                      className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SidebarSubmenu;
