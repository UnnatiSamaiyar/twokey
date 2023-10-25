import React, { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient";
import docIcon from "../assets/docIcon.png";
import pdfIcon from "../assets/pdfIcon.png";
import pptIcon from "../assets/pptIcon.png";
import xlsIcon from "../assets/xlsIcon.png";
import zipIcon from "../assets/zipIcon.png";
import jpgIcon from "../assets/jpgIcon.png";

const fileTypes = [
  { type: "Documents", icon: docIcon },
  { type: "PDF", icon: pdfIcon },
  { type: "PPT", icon: pptIcon },
  { type: "XLS", icon: xlsIcon },
  { type: "ZIP", icon: zipIcon },
  { type: "JPG", icon: jpgIcon },
];

const FileTypes = () => {
  const [updatedFileTypes, setUpdatedFileTypes] = useState(fileTypes);

  useEffect(() => {
    async function fetchFileTypeFromSupabase() {
      const { data, error } = await supabase.storage.from("TwoKey").list();

      if (error) {
        console.error("Error fetching file types:", error);
        return;
      }

      const metadataArray = data.map(
        (fileObject) => fileObject.metadata.mimetype
      );

      const mimeTypeToType = {
        "application/msword": "Documents",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          "Documents",
        "application/pdf": "PDF",
        "application/vnd.ms-powerpoint": "PPT",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          "PPT",
        "application/vnd.ms-excel": "XLS",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          "XLS",
        "application/zip": "ZIP",
        "image/jpeg": "JPG",
      };

      const typeCount = {};

      metadataArray.forEach((metadata) => {
        const type = mimeTypeToType[metadata];
        if (type) {
          if (typeCount[type]) {
            typeCount[type]++;
          } else {
            typeCount[type] = 1;
          }
        }
      });

      const updatedFileTypes = fileTypes.map((fileType) => ({
        ...fileType,
        fileCount: typeCount[fileType.type] || 0,
      }));

      setUpdatedFileTypes(updatedFileTypes);
      //   console.log("updatedFileTypes ", updatedFileTypes);
    }

    fetchFileTypeFromSupabase();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4">
      {updatedFileTypes.map((file) => (
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
                {file.fileCount ? file.fileCount : "0"} files
              </p>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default FileTypes;
