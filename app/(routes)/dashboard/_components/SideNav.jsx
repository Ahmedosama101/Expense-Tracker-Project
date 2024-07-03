"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutGrid,
  ReceiptText,
  WalletMinimal,
  ChevronFirst,
  ChevronLast,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarContext = createContext();

function SideNav() {
  const { user } = useUser();
  const [expanded, setExpanded] = useState(true);
  const path = usePathname();

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayoutGrid />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: <WalletMinimal />,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: <ReceiptText />,
      path: "/dashboard/expensespage",
    },
  ];

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <div className="flex h-screen">
        <aside
          className={`transition-all duration-300 ${
            expanded ? "w-64" : "w-16"
          } bg-white border-r shadow-sm z-50 flex-shrink-0`}
        >
          <nav className="flex flex-col h-full">
            <div className="p-4 pb-2 flex justify-between items-center">
              <Link href="/">
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  width={60}
                  height={20}
                  className={`overflow-hidden transition-all ${
                    expanded ? "block" : "hidden"
                  }`}
                />
              </Link>
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            </div>

            <ul className="flex-auto px-3 ">
              {menuList.map((menu) => (
                <SidebarItem
                  key={menu.id}
                  icon={menu.icon}
                  text={menu.name}
                  active={path === menu.path}
                  path={menu.path}
                />
              ))}
            </ul>

            <div className="border-t flex p-3">
              <UserButton />
              <div
                className={`flex justify-between items-center overflow-hidden transition-all ${
                  expanded ? "w-52 ml-3" : "w-0"
                }`}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">{user?.fullName}</h4>
                  <span className="text-xs text-gray-600">
                    {user?.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </SidebarContext.Provider>
  );
}

function SidebarItem({ icon, text, active, path }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <Link href={path} className="flex items-center">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}

export default SideNav;
