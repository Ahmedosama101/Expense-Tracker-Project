"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { eq } from "drizzle-orm";
import { Expenses } from "@/schema";
import { db } from "@/db";
import { toast } from "sonner";
import moment from "moment";

function EditExpense({ expenseInfo, refershData }) {
  const [name, setName] = useState(expenseInfo?.name || "");
  const [amount, setAmount] = useState(expenseInfo?.amount || "");
  const { user } = useUser();

  useEffect(() => {
    if (expenseInfo) {
      setName(expenseInfo.name);
      setAmount(expenseInfo.amount);
    }
  }, [expenseInfo]);

  const onUpdateExpense = async () => {
    const result = await db
      .update(Expenses)
      .set({
        name: name,
        amount: amount,
        updatedAt: moment().format("DD/MM/yyyy"), // Assuming updatedAt is a string representing the date
      })
      .where(eq(Expenses.id, expenseInfo.id))
      .returning();

    if (result) {
      refershData();
      toast("Expense Updated");
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && refershData()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                  value={name}
                  placeholder="e.g. living room decor"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                  value={amount}
                  placeholder="e.g. 1000"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={onUpdateExpense}
              className="mt-5 w-full"
            >
              Update Expense
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpense;
