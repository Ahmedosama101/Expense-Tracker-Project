import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const getBarColor = (percentage) => {
    if (percentage <= 60) {
      return "bg-primary"; // Assuming 'bg-primary' is your current color
    } else if (percentage <= 85) {
      return "bg-yellow-500"; // Change to yellow for 60% - 85%
    } else {
      return "bg-red-500"; // Change to red for above 85%
    }
  };

  const progressPerc = calculateProgressPerc();
  const barColor = getBarColor(progressPerc);

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[150px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-3xl p-3 bg-slate-100 rounded-full px-4">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget.totalItem} items
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">
            {budget.amount} QAR
          </h2>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              {budget.totalSpend ? budget.totalSpend : 0} QAR Spent
            </h2>
            <h2 className="text-xs text-slate-400">
              {budget.amount - budget.totalSpend} QAR Remaining
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className={`${barColor} h-2 rounded-full`}
              style={{ width: `${progressPerc}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
