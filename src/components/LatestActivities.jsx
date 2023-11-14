import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Checkmark from "../assets/checkmark.svg";

let departments = [
  { name: "Account", path: "/account" },
  { name: "Finance", path: "/finance" },
  { name: "Development", path: "/development" },
  { name: "Manufacturing", path: "/manufacturing" },
  { name: "Sales", path: "/sales" },
  { name: "Human Resources", path: "/humanresources" },
  { name: "Account", path: "/account" },
  { name: "Finance", path: "/finance" },
  { name: "Development", path: "/development" },
  { name: "Manufacturing", path: "/manufacturing" },
  { name: "Sales", path: "/sales" },
  { name: "Human Resources", path: "/humanresources" },
  { name: "Account", path: "/account" },
  { name: "Finance", path: "/finance" },
  { name: "Development", path: "/development" },
  { name: "Manufacturing", path: "/manufacturing" },
  { name: "Sales", path: "/sales" },
  { name: "Human Resources", path: "/humanresources" },
  { name: "Account", path: "/account" },
  { name: "Finance", path: "/finance" },
  { name: "Development", path: "/development" },
  { name: "Manufacturing", path: "/manufacturing" },
  { name: "Sales", path: "/sales" },
  { name: "Human Resources", path: "/humanresources" },
];

const LatestActivities = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    console.log("Selected Value:", value);
  };

  return (
    <div className="w-2/5">
      <Paper className="h-72 ">
        <div className="flex justify-between items-center p-4">
          <span className="flex flex-row items-center gap-1">
            <p className="text-sm font-semibold">Latest Activities</p>
            <select
              className="text-sm text-gray-400"
              onChange={handleSelectChange}
              value={selectedValue}
            >
              <option value="All">All</option>
              <option value="Requested">Requested</option>
              <option value="Access">Access</option>
            </select>
          </span>
          <span className="flex items-center gap-1">
            <p className="text-xs text-gray-500">Mark all as read</p>
            <img src={Checkmark} alt="✔" className="text-sm" />
          </span>
        </div>

        <div className="h-56 overflow-y-scroll scrollbar-hide">
          {departments.map((dep, index) => (
            <p key={index} className="p-2 border-b">
              {dep.name}
            </p>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default LatestActivities;
