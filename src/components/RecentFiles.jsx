import React, { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient";
import axios from "axios";

const RecentFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchRecentFiles() {
      try {
        let token = JSON.parse(sessionStorage.getItem("token"));

        // console.log("token in recent files 1 :", token.session.access_token);

        const recentFilesFromBackend = await axios.get(
          "https://twokeybackend.onrender.com/file/files/",
          {
            headers: {
              Authorization: `Bearer ${token.session.access_token}`,
            },
          }
        );

        // console.log("token in recent files 2 :", token.session.access_token);

        const mappedFiles = recentFilesFromBackend.data
          .slice(0, 6) // Get the first 6 files
          .map((file) => ({
            name: file.name.substring(0, 80),
            size: formatFileSize(file.metadata.size),
            previewURL: file.url,
          }));
        setFiles(mappedFiles);
        console.log("Recent files from backend:", recentFilesFromBackend);
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
      <p className="text-lg font-semibold my-4">Recent Files</p>
      <div className="grid grid-cols-3 gap-4 text-gray-600">
        {files &&
          files.map((file, index) => (
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
