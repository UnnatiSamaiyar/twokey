import React, { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient";
import axios from "axios";
import FileDrawer from "./FileDrawer";

const RecentFiles = () => {
  const [files, setFiles] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileSize, setSelectedFileSize] = useState("");

  const openDrawer = (fileName, fileSize) => {
    setSelectedFileName(fileName);
    setSelectedFileSize(fileSize);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    async function fetchRecentFiles() {
      try {
        let token = JSON.parse(sessionStorage.getItem("token"));

        const recentFilesFromBackend = await axios.get(
          "https://twokeybackend.onrender.com/file/files/",
          {
            headers: {
              Authorization: `Bearer ${token.session.access_token}`,
            },
          }
        );

        const mappedFiles = recentFilesFromBackend.data
          .slice(0, 6)
          .map((file) => ({
            name: file.name.substring(0, 80),
            size: formatFileSize(file.metadata.size),
            previewURL: file.url,
          }));
        console.log(mappedFiles);
        setFiles(mappedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }
    fetchRecentFiles();
  }, []);

  useEffect(() => {
    async function recent() {
      const { data, error } = await supabase.storage.from("TwoKey").list();
    }
    recent();
  });

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
              className="border border-gray-200 p-2 rounded-lg shadow-md cursor-pointer"
              onClick={() => openDrawer(file.name, file.size)} // Pass name and size to openDrawer
            >
              <img src={file.previewURL} alt="File Preview" />
              <h5 className="font-semibold">{file.name}</h5>
              <h6 className="text-sm font-semibold">File Info:</h6>
              <p className="text-xs text-gray-500 font-light">{file.size}</p>
            </div>
          ))}
      </div>

      {/* FileDrawer component to manage the drawer */}
      <FileDrawer
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        selectedFileName={selectedFileName}
        selectedFileSize={selectedFileSize}
      />
    </div>
  );
};

export default RecentFiles;
