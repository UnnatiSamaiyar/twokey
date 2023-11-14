import React from "react";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

const DueDate = () => {
  const skeletons = [];
  for (let i = 0; i < 4; i++) {
    skeletons.push(
      <Skeleton key={i} variant="rounded" height={50} className="w-full my-2" />
    );
  }

  return (
    <div className="w-3/5">
      <Paper className="h-72 p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">Due Date</p>
          <b className="rotate-90">...</b>
        </div>
        {/* <Skeleton variant="rounded" height={60} className="w-full my-2" /> */}
        <div className="h-56 overflow-y-scroll scrollbar-hide">{skeletons}</div>
      </Paper>
    </div>
  );
};

export default DueDate;
