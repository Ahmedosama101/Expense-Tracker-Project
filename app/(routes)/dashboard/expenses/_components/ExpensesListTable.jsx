import { useState } from "react";
import { db } from "@/db";
import { Expenses } from "@/schema";
import { eq } from "drizzle-orm";
import { Trash, Edit3 } from "lucide-react"; // Import Edit icon
import moment from "moment";
import React from "react";
import { toast } from "sonner";
import EditExpense from "./EditExpense"; // Adjust the path as needed

function ExpensesListTable({ expensesList, refershData }) {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      refershData();
      toast("Expense Deleted!");
    }
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedExpense(null);
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>

      <div className="grid grid-cols-4 bg-slate-200 p-2 rounded-sm mt-3">
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
            <h2>{moment(expense.createdAt).format("DD/MM/yyyy")}</h2>
            <h2 className="flex items-center gap-2">
              <Edit3
                className="text-blue-600 cursor-pointer"
                onClick={() => handleEditClick(expense)}
              />
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

      {isDialogOpen && selectedExpense && (
        <EditExpense
          expenseInfo={selectedExpense}
          refershData={() => {
            refershData();
            closeDialog();
          }}
        />
      )}
    </div>
  );
}

export default ExpensesListTable;
