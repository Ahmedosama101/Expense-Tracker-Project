"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/db";
import { Budgets, Expenses } from "@/schema";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpensesListTable from "./Expenses/_components/ExpensesListTable";

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
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
    console.log("Budget List:", result); // Debugging log
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.creactedAt,
      })
      .from(Expenses)
      .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
      .where(eq(Budgets.creactedBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
    console.log("Expenses List:", result); // Debugging log
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}✌️</h2>
      <p className="text-gray-500">
        Let's Manage Your Expenses!! Set Your Budgets & its Expenses with ET
      </p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <ExpensesListTable
            expensesList={expensesList}
            refershData={getBudgetList} // Fix typo and pass function reference
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budget</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
