import { Hash, ReceiptText, WalletMinimal } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState([]);
  const [totalSpend, setTotalSpend] = useState([]);

  useEffect(() => {
    budgetList && CalculatedCardInfo();
  }, [budgetList]);

  const CalculatedCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
      (totalBudget_ = totalBudget_ + Number(element.amount)),
        (totalSpend_ = totalSpend_ + element.totalSpend);
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">{totalBudget} QAR</h2>
            </div>
            <WalletMinimal
              className="bg-primary p-3 h-12 w-12 rounded-full
            text-white"
            />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">Total Spent</h2>
              <h2 className="font-bold text-2xl">{totalSpend} QAR</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">No. of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <Hash className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="h-[110px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
