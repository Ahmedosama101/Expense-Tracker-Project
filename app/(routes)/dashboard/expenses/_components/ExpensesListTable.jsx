import { db } from "@/db";
import { Expenses } from "@/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner";

function ExpensesListTable({ expensesList, refershData }) {
  console.log(expensesList); // Add this line to log the expenses list for debugging

  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refershData();
    }
  };
  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2 rounded-sm">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {Array.isArray(expensesList) && expensesList.length > 0 ? (
        expensesList.map((expense, index) => (
          <div
            key={index}
            className="grid grid-cols-4 bg-slate-50 p-2 rounded-sm"
          >
            <h2>{expense.name}</h2>
            <h2>{expense.amount}</h2>
            <h2>{moment(expense.createdAt).format("DD/MM/yyyy")}</h2>{" "}
            {/* Format the date using moment.js */}
            <h2>
              <Trash
                className="text-red-600 cursor-pointer"
                onClick={() => deleteExpense(expense)}
              />
            </h2>
          </div>
        ))
      ) : (
        <div className="p-2 text-center text-gray-50">No expenses to show</div>
      )}
    </div>
  );
}

export default ExpensesListTable;
