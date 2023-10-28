import React, { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient";
import axios from "axios";
import docIcon from "../assets/docIcon.png";
import pdfIcon from "../assets/pdfIcon.png";
import pptIcon from "../assets/pptIcon.png";
import xlsIcon from "../assets/xlsIcon.png";
import zipIcon from "../assets/zipIcon.png";
import jpgIcon from "../assets/jpgIcon.png";

const fileTypes = [
  { type: "Documents", icon: docIcon, mimeType: "application/msword" },
  { type: "PDF", icon: pdfIcon, mimeType: "application/pdf" },
  { type: "PPT", icon: pptIcon, mimeType: "application/vnd.ms-powerpoint" },
  { type: "XLS", icon: xlsIcon, mimeType: "application/vnd.ms-excel" },
  { type: "ZIP", icon: zipIcon, mimeType: "application/zip" },
  { type: "JPG", icon: jpgIcon, mimeType: "image/jpeg" },
  // { type: "Other", icon: docIcon, mimeType: "other" },
];

const FileTypes = () => {
  const [fileCounts, setFileCounts] = useState({});

  useEffect(() => {
    async function fetchFiles() {
      const { data, error } = await supabase.storage.from("TwoKey").list();

      if (!error) {
        // Count files by MIME type
        const fileTypeCounts = {};
        data.forEach((file) => {
          let mimeType = file.metadata.mimetype.toLowerCase();

          // Check if the MIME type contains keywords
          if (mimeType.includes(".document") || mimeType.includes(".word")) {
            mimeType = "application/msword";
          } else if (
            mimeType.includes("ppt") ||
            mimeType.includes("presentation") ||
            mimeType.includes("powerpoint")
          ) {
            mimeType = "application/vnd.ms-powerpoint";
          } else if (mimeType.includes("pdf")) {
            mimeType = "application/pdf";
          } else if (
            mimeType.includes("csv") ||
            mimeType.includes("xls") ||
            mimeType.includes("ods")
          ) {
            mimeType = "application/vnd.ms-excel";
          } else if (mimeType.includes("zip") || mimeType.includes("rar")) {
            mimeType = "application/zip";
          } else if (mimeType.includes("image/")) {
            mimeType = "image/jpeg";
          } else {
            mimeType = "other"; // Categorize as "Other" if not recognized
          }

          fileTypeCounts[mimeType] = (fileTypeCounts[mimeType] || 0) + 1;
        });

        console.log("fileTypeCounts", fileTypeCounts);
        setFileCounts(fileTypeCounts);
      }
    }

    fetchFiles();
  }, []);

  return (
    <>
      <p className="text-lg font-semibold my-4">Files</p>
      <div className="grid grid-cols-6 gap-4">
        {fileTypes.map((file) => (
          <div
            className="flex flex-row justify-between items-center border p-2 rounded-lg"
            key={file.type}
          >
            <span className="flex flex-row gap-2 items-center">
              <img
                src={file.icon}
                alt="fileType"
                className="rounded-lg p-1 h-8"
              />{" "}
              <span>
                <p className="text-md font-semibold">{file.type}</p>
                <p className="text-xs">
                  {fileCounts[file.mimeType] ? fileCounts[file.mimeType] : 0}{" "}
                  files
                </p>
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default FileTypes;
