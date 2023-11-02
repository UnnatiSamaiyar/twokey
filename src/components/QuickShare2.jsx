import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../context/authContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { supabase } from "../helper/supabaseClient";

export default function QuickShare2({
  open,
  onClose,
  droppedFiles,
  handleRemoveFile,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRemoveUser = (index) => {
    const updatedUsers = [...selectedUsers];
    updatedUsers.splice(index, 1);
    setSelectedUsers(updatedUsers);
  };

  const handleFinalUpload = async () => {
    try {
      for (const file of droppedFiles) {
        const { data, error } = await supabase.storage
          .from("TwoKey")
          .upload(file.name, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw new Error("File upload failed");
        }
      }
      showSnackbar("Upload successful", "success");
    } catch (error) {
      console.error("Error occurred in file upload:", error);
      showSnackbar("Upload failed. Please try again.", "error");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "15px",
        },
      }}
    >
      <DialogTitle>Quick Share</DialogTitle>
      <DialogContent className="bg-gray-100">
        <div className="w-80 py-4">
          <ul>
            {droppedFiles.map((file, index) => (
              <li
                key={file.name}
                className="text-xs bg-white border border-gray-200 rounded-md py-1 px-4 mb-1 flex items-center justify-between "
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

          <p className="my-2 font-semibold">Receivers</p>

          <Select
            multiple
            value={selectedUsers}
            onChange={(event) => setSelectedUsers(event.target.value)}
            displayEmpty
            size="small"
            fullWidth
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={users.find((user) => user.id === value).email}
                    className="mx-1"
                  />
                ))}
              </div>
            )}
          >
            <MenuItem value="" disabled>
              <p>Select a user</p>
            </MenuItem>
            {users.length > 0 &&
              users.map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <span className="">
                    <p className="text-sm font-semibold">{user.email}</p>
                  </span>
                </MenuItem>
              ))}
          </Select>
        </div>

        {selectedUsers.length > 0 && (
          <div className="my-2">
            <ul>
              {selectedUsers.map((selectedUserId, index) => {
                const selectedUser = users.find(
                  (user) => user.id === selectedUserId
                );
                return (
                  <li
                    key={selectedUser.id}
                    className="py-2 px-4 my-1 bg-white rounded-xl border shadow-md flex justify-between items-center "
                  >
                    <span>
                      <p className="text-sm font-semibold">
                        {selectedUser.email}
                      </p>
                      <p className="text-xs font-light text-gray-500">
                        {selectedUser.email}
                      </p>
                    </span>
                    <button
                      onClick={() => handleRemoveUser(index)}
                      className="text-white bg-gray-200 rounded-full h-4 w-4 text-xs hover:text-gray-700 focus:outline-none"
                    >
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </DialogContent>
      <DialogActions style={{ margin: "5px" }}>
        <button
          onClick={onClose}
          className="text-black border border-gray-300 py-1 px-3 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleFinalUpload}
          className="bg-blue-700 text-white py-1 px-3 rounded-lg"
        >
          Upload
        </button>
      </DialogActions>
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
    </Dialog>
  );
}
