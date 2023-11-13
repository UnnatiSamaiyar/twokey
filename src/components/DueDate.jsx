import React from "react";
import Paper from "@mui/material/Paper";

const DueDate = () => {
  return (
    <div className="w-3/5">
      <Paper className="h-64 p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">Due Date</p>
          <b className="rotate-90">...</b>
        </div>
      </Paper>
    </div>
  );
};

export default DueDate;
