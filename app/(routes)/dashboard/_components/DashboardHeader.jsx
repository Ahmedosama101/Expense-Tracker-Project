import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

function DashboardHeader() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="p-5 shadow-md border-b flex justify-between">
      <div className="font-bold pt-1">{currentDate}</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
