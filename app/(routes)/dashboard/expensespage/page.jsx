"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/db";
import { Budgets, Expenses } from "@/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import ExpensesListTable from "../expenses/_components/ExpensesListTable";

function Page() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
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

      console.log("Budget List:", result);
      setBudgetList(result);
      getAllExpenses();
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.creactedAt,
        })
        .from(Expenses)
        .leftJoin(Budgets, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.creactedBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));

      console.log("Expenses List:", result);
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="mt-4">
        <ExpensesListTable
          expensesList={expensesList}
          refershData={() => getBudgetList()}
        />
      </div>
    </div>
  );
}

export default Page;
