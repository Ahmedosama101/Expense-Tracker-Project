"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "../dashboard/_components/CardInfo";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/db";
import { Budgets, Expenses } from "@/schema";
//import BudgetItem from "../dashboard/budgets/_components/BudgetItem";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.creactedBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}✌️</h2>
      <p className="text-gray-500">
        Here's what's happening with your money, Let's Manage Your Expenses!!
      </p>

      <CardInfo budgetList={budgetList} />
    </div>
  );
}

export default Dashboard;
