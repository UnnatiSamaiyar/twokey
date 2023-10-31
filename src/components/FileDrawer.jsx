import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { supabase } from "../helper/supabaseClient";
import { useAuth } from "../context/authContext";

const FileDrawer = ({
  isDrawerOpen,
  closeDrawer,
  selectedFileName,
  selectedFileSize,
}) => {
  const [screenshotDetected, setScreenshotDetected] = useState(false);

  const { isFileViewerOpen, openFileViewer, closeFileViewer } = useAuth();

  const toggleFileViewer = () => {
    if (isFileViewerOpen) {
      closeFileViewer();
    } else {
      openFileViewer();
    }
  };

  useEffect(() => {
    const preventPrintScreen = (e) => {
      try {
        const forbiddenKeys = [
          "PrintScreen",
          "Snapshot",
          "PrtSc",
          "Meta",
          "Escape",
          "PrtSc",
          "Control",
          "Alt",
          "Shift",
          "Insert",
        ];
        if (forbiddenKeys.includes(e.key)) {
          e.preventDefault();

          setScreenshotDetected(true);

          // Remove the blur class after 2 seconds
          setTimeout(() => {
            setScreenshotDetected(false);
          }, 2000);
        }
      } catch (error) {
        console.error(
          "An error occurred while preventing Print Screen:",
          error
        );
      }
    };

    document.addEventListener("keydown", preventPrintScreen);

    return () => {
      document.removeEventListener("keydown", preventPrintScreen);
    };
  }, []);

  const handleDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("TwoKey")
        .download(selectedFileName);
      console.log("Download success", data);
    } catch (error) {
      console.log("Error occured while downloading the file.");
    }
  };

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("TwoKey")
        .remove(selectedFileName);
      console.log("Delete success", data);
    } catch (error) {
      console.log("Error occured while deleting the file.");
    }
  };

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
      <div
        className={`drawer-content w-64 p-4 bg-white bg-inherit ${
          screenshotDetected ? "blur" : ""
        }`}
      >
        <IconButton onClick={closeDrawer}>
          <ChevronRightIcon />
        </IconButton>
        <h4 className="font-semibold text-sm">File Preview</h4>
        <div className="flex flex-col justify-center items-center">
          <div className="w-48 h-64 bg-gray-100 my-2 rounded-md shadow-md"></div>
          <h2>{selectedFileName}</h2>
        </div>
        <hr className="my-2" />
        <h4 className="font-semibold text-sm text-gray-900">Description</h4>
        <p className="text-xs font-semibold my-2 line-clamp-3 leading-4 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <hr className="my-2" />

        <h4 className="font-semibold text-sm my-2 text-gray-900">
          File Information
        </h4>
        <p className="text-xs font-bold">Who has access</p>
        <p className="text-xs font-bold">File Owner</p>

        <hr className="my-2" />
        <h4 className="font-semibold text-sm my-2 text-gray-900">Properties</h4>
        <span className="flex flex-col text-xs font-semibold text-gray-400 leading-5 p-2">
          <span className="flex justify-between items-center">
            <p className="">Type</p>
            <p>pdf</p>
          </span>
          <span className="flex justify-between items-center">
            <p className="">Size</p>
            <p>{selectedFileSize}</p>
          </span>
          <span className="flex justify-between items-center">
            <p className="">Last modified</p>
            <p>date</p>
          </span>
        </span>
        <button
          className="bg-green-600 text-white py-1 px-4 rounded-md w-full my-2"
          onClick={toggleFileViewer}
        >
          Open
        </button>
        <span className="flex justify-between gap-2">
          <button
            className="bg-green-600 text-white py-1 px-4 rounded-md w-full my-2"
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className="bg-red-500 text-white py-1 px-4 rounded-md w-full my-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </span>
      </div>
    </Drawer>
  );
};

export default FileDrawer;
