import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDropzone } from "react-dropzone";
import { supabase } from "../helper/supabaseClient";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import QuickShare2 from "./QuickShare2";
import { useAuth } from "../context/authContext";

export default function QuickShare() {
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [customFileName, setCustomFileName] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { listUsers } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDroppedFiles([]);
    setSuccessMessage(null);
    setCustomFileName("");
  };

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = [...droppedFiles];
    updatedFiles.splice(fileIndex, 1);
    setDroppedFiles(updatedFiles);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const fileNameRegex = /^[A-Za-z0-9.@]+$/;

  const handleFileNameChange = (e) => {
    const inputValue = e.target.value;
    if (fileNameRegex.test(inputValue) || inputValue === "") {
      setCustomFileName(inputValue);
    }
  };

  const handleUpload = async () => {
    setReviewOpen(true);
    setOpen(false);
  };

  const onDrop = (acceptedFiles, rejectedFiles) => {
    setDroppedFiles([...droppedFiles, ...acceptedFiles]);
    console.log("Rejected files:", rejectedFiles);
  };

  const handleFinalUpload = async () => {
    // Your upload logic for the review dialog can be added here.
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="py-1 px-4 rounded-md bg-blue-700 text-white flex items-center"
      >
        Quick Share
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Quick Share</DialogTitle>
        <DialogContent className="p-4 bg-gray-100">
          <DialogContentText></DialogContentText>
          <p className="text-sm font-semibold mt-2">
            File name<span className="text-blue-800 ml-1">*</span>
          </p>
          <input
            type="text"
            value={customFileName}
            onChange={handleFileNameChange}
            className="w-full py-1 px-2 my-2 border border-gray-200 rounded-md"
            required
          />
          <div
            {...getRootProps()}
            className={`mt-2 h-64 w-80 flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-md text-center cursor-pointer ${
              isDragActive
                ? "bg-blue-50 border-blue-500"
                : "hover:bg-blue-50 hover:border-blue-500"
            }`}
          >
            <input {...getInputProps()} />
            <p className="hover:text-blue-500">Drag files to upload</p>
          </div>
          {droppedFiles.length > 0 && (
            <div>
              <p className="text-black text-sm font-semibold py-2 mb-2">
                Uploading - {droppedFiles.length}{" "}
                {droppedFiles.length === 1 ? "file" : "files"}
              </p>
              <ul>
                {droppedFiles.map((file, index) => (
                  <li
                    key={file.name}
                    className="text-xs bg-white border border-gray-200 rounded-md py-2 px-4 mb-1 flex items-center justify-between"
                  >
                    <span>{file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-white bg-gray-200 rounded-full h-4 w-4 text-xs hover:text-gray-700 focus:outline-none"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="text-black border border-gray-300 py-1 px-3 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleUpload();
              listUsers();
            }}
            className="bg-blue-700 text-white py-1 px-3 rounded-md"
          >
            Upload
          </button>
        </DialogActions>
      </Dialog>
      <QuickShare2
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        droppedFiles={droppedFiles}
        handleRemoveFile={handleRemoveFile}
        handleFinalUpload={handleFinalUpload}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
