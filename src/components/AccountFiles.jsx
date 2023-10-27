import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

// Define the formatFileSize function
function formatFileSize(sizeInBytes) {
  const units = ["B", "KB", "MB", "GB"];
  let size = sizeInBytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return size.toFixed(2) + " " + units[unitIndex];
}

const originalData = [
  {
    id: "5fe63f9c-6677-4199-b972-13bc711dfcc6",
    name: "sample.pdf",
    org_name: "Google",
    dept_name: "Marketing",
    metadata: {
      size: 32,
      mimetype: "text/plain;charset=UTF-8",
    },
  },
  {
    id: "0cc4b60d-73f3-4e94-ac6c-2407243a7f79",
    name: "two (1).pptx",
    org_name: "Google",
    dept_name: "Marketing",
    metadata: {
      size: 6719767,
      mimetype:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    },
  },
  {
    id: "6f29ecac-8020-430a-81be-8d470a16f21c",
    name: "Two key contract details.docx",
    org_name: "Google",
    dept_name: "Marketing",
    metadata: {
      size: 18099,
      mimetype:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
  },
  {
    id: "d1823f2d-3acd-4b7f-8b4f-90a875811966",
    name: "hck.pdf",
    org_name: "Google",
    dept_name: "Marketing",
    metadata: {
      size: 32,
      mimetype: "text/plain;charset=UTF-8",
    },
  },
  {
    id: "ea06abc6-88d5-4a1a-bb8e-d36c18fd07eb",
    name: "acquisitions.md",
    org_name: "Google",
    dept_name: "Marketing",
    metadata: {
      size: 909,
      mimetype: "application/octet-stream",
    },
  },
  {
    id: "467d134f-1e35-4444-9a37-b38c066ffcc7",
    name: "Screenshot (138).png",
    org_name: "Google",
    dept_name: "Marketing",
    metadata: {
      size: 358518,
      mimetype: "image/png",
    },
  },
  {
    id: "d90304c9-b4e3-4909-bd6c-b059ae7cd167",
    name: "lose.jpg",
    org_name: "Google",
    dept_name: "Marketing",
    metadata: {
      size: 80531,
      mimetype: "image/jpeg",
    },
  },
];

const AccountFiles = () => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter the original data to extract name, size, and mimetype
    const filtered = originalData.map((item) => ({
      id: item.id,
      name: item.name,
      size: formatFileSize(item.metadata.size), // Format size using the function
      mimetype: item.metadata.mimetype,
      status: "Team",
      security: "Enhanced",
    }));
    setFilteredData(filtered);
  }, []);

  const columns = [
    { field: "id", width: 50, headerName: "ID" },
    { field: "name", width: 350, headerName: "FILE NAME" },
    {
      field: "status",
      width: 150,
      headerName: "STATUS",
      renderCell: (params) => {
        const value = params.value;
        return (
          <div className="bg-gray-200 text-gray-700 w-1/2 py-1 px-2 rounded-md">
            {value}
          </div>
        );
      },
    },
    {
      field: "size",
      width: 150,
      headerName: "SIZE",
      renderCell: (params) => {
        const value = params.value;
        return (
          <div className="bg-gray-200 text-gray-700 w-2/3 py-1 px-2 rounded-md">
            {value}
          </div>
        );
      },
    },
    {
      field: "security",
      width: 150,
      headerName: "SECURITY",
      renderCell: (params) => {
        const value = params.value;
        return (
          <div className="bg-green-100 text-green-800 text-sm py-1 px-2 rounded-md">
            {value}
          </div>
        );
      },
    },
    { field: "mimetype", width: 200, headerName: "FILE TYPE" },
  ];

  return (
    <div className="text-center">
      <p className="text-lg text-left font-semibold my-6">Account Files</p>
      <Box sx={{ height: 550, width: "100%" }}>
        <DataGrid columns={columns} rows={filteredData} />
      </Box>
    </div>
  );
};

export default AccountFiles;
