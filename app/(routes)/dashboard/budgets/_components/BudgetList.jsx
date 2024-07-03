"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import { db } from "@/db";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/schema";
import { useUser } from "@clerk/nextjs";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    setLoading(true); // Start loading
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
    setLoading(false); // Stop loading once data is fetched
  };

  useEffect(() => {
    if (!loading && budgetList.length > 0) {
      const timer = setTimeout(() => setLoading(false), 2000); // Stop pulse effect after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [budgetList]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refershData={() => getBudgetList()} />
        {loading ? (
          Array.from({ length: Math.max(budgetList.length, 4) }).map(
            (_, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            )
          )
        ) : budgetList.length > 0 ? (
          budgetList.map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          ))
        ) : (
          <div>No budgets found.</div>
        )}
      </div>
    </div>
  );
}

export default BudgetList;
