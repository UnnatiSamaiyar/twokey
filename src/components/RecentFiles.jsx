import React, { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient";

const RecentFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchRecentFiles() {
      try {
        const { data, error } = await supabase.storage.from("TwoKey").list();
        // console.log("raw recent files ", data);
        if (error) {
          console.error("Error fetching files:", error.message);
        } else {
          const mappedFiles = data.map((file) => ({
            name: file.name.substring(0, 80), // Limit file name to 120 characters
            size: formatFileSize(file.metadata.size),
            previewURL: file.url, // Assuming the file URL is the preview URL
          }));
          setFiles(mappedFiles);
          // console.log("Recent files:", mappedFiles);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }
    fetchRecentFiles();
  }, []);

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

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 text-gray-600">
        {files.map((file, index) => (
          <div
            key={index}
            className="border border-gray-200 p-2 rounded-lg shadow-md"
          >
            <img src={file.previewURL} alt="File Preview" />
            <h5 className="font-semibold">{file.name}</h5>
            <h6 className="text-sm font-semibold">File Info:</h6>
            <p className="text-xs text-gray-500 font-light">{file.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;
