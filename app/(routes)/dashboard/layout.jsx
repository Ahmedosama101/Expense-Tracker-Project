"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "/db";
import { Budgets } from "/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.creactedBy, user?.primaryEmailAddress?.emailAdress));
    console.log(result);
    if (result?.length == 0) {
      // router.replace('/dashboard/budgets')
    }
  };

  return (
    <div className="flex">
      <div>
        <SideNav
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
        />
      </div>
      <div
        className={`flex-1 ${
          sidebarExpanded ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
