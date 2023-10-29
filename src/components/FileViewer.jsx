import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const FileViewer = ({ open, onClose, name, selectedFileSize }) => {
  let docs = [
    {
      uri: "https://dxqrkmzagreeiyncplzx.supabase.co/storage/v1/object/sign/TwoKey/tml?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJUd29LZXkvdG1sIiwiaWF0IjoxNjk4NTkzODQ3LCJleHAiOjE2OTkxOTg2NDd9.ljLZurZPNnZGojUANMX8_rN9E1KHTlybF4kctCK-p4c&t=2023-10-29T15%3A37%3A27.223Z",
    },
  ];
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>File Name</DialogTitle>
      <div className="">
        <DialogContent>
          <p>{name}</p>
          <p>{selectedFileSize}</p>
          <p>
            .........................................................................................
          </p>

          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default FileViewer;
