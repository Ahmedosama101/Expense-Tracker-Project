"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { LayoutGrid, ReceiptText, WalletMinimal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
  const { user } = useUser();

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: WalletMinimal,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expensespage",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="h-screen p-5 border shadow-md">
      <Link href="/">
        <Image src={"./logo.svg"} alt="logo" width={60} height={20} />
      </Link>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path}>
            <h2
              className={`flex gap-2 items-center
             text-gray-500 font-medium mb-2
              p-5 cursor-pointer rounded-md
              hover:text-primary hover:bg-blue-200
              ${path == menu.path && "text-primary bg-blue-100"}
              `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        {user?.fullName}
      </div>
    </div>
  );
}

export default SideNav;
