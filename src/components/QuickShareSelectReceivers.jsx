import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../context/authContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import QuickShareSelectSecurityLevel from "./QuickShareSelectSecurityLevel";

export default function QuickShareSelectReceivers({
  open,
  onClose,
  droppedFiles,
  handleRemoveFile,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users } = useAuth();
  const [securityLevelOpen, setSecurityLevelOpen] = useState(false);

  const addUserToSelectedUsers = (user) => {
    const updatedUsers = [...selectedUsers, user];
    setSelectedUsers(updatedUsers);
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...selectedUsers];
    updatedUsers.splice(index, 1);
    setSelectedUsers(updatedUsers);
  };

  const handleUploadClick = () => {
    setSecurityLevelOpen(true);
    onClose();
  };

  return (
    <div>
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
                  className="text-xs bg-white border border-gray-200 border-b-2 border-b-green-600 rounded-md py-1 px-4 mb-1 flex items-center justify-between "
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
              value={selectedUsers.map((user) => user.id)}
              onChange={(event) => {
                const selectedUserIds = event.target.value;
                const selectedUserObjects = users.filter((user) =>
                  selectedUserIds.includes(user.id)
                );
                setSelectedUsers(selectedUserObjects);
              }}
              displayEmpty
              size="small"
              fullWidth
              renderValue={(selected) => (
                <div>
                  {selected.map((userId) => (
                    <Chip
                      key={userId}
                      label={users.find((user) => user.id === userId).email}
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
                    <span className="flex justify-between items-center w-full">
                      <span>
                        <p className="text-sm font-semibold">{user.email}</p>
                        <p className="text-xs font-light text-gray-500">
                          {user.email}
                        </p>
                      </span>
                      <p className="text-sm font-semibold">Invite › </p>
                    </span>
                  </MenuItem>
                ))}
            </Select>
          </div>

          {selectedUsers &&
            selectedUsers.map((user, index) => (
              <span
                key={user.id}
                className="flex justify-between items-center w-full my-2"
              >
                <span className="flex justify-between items-center bg-white rounded-full py-1 px-2 border gap-2">
                  <p className="text-sm font-semibold">{user.email}</p>
                  <button
                    onClick={() => handleRemoveUser(index)}
                    className="h-4 w-4 text-xs"
                  >
                    ⨉
                  </button>
                </span>
                <p className="text-sm font-semibold bg-white py-1 px-2 rounded-md border">
                  Can Edit{" "}
                </p>
              </span>
            ))}
        </DialogContent>
        <DialogActions style={{ margin: "5px" }}>
          <button
            onClick={onClose}
            className="text-black border border-gray-300 py-1 px-3 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadClick}
            className="bg-blue-700 text-white py-1 px-3 rounded-lg"
          >
            Upload
          </button>
        </DialogActions>
      </Dialog>

      {securityLevelOpen && (
        <QuickShareSelectSecurityLevel
          open={securityLevelOpen}
          selectedUsers={selectedUsers}
          onClose={() => setSecurityLevelOpen(false)}
          droppedFiles={droppedFiles}
          handleRemoveFile={handleRemoveFile}
          handleRemoveUser={handleRemoveUser}
        />
      )}
    </div>
  );
}
