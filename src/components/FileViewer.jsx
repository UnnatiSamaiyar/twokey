import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DocViewer, {
  DocViewerRenderers,
  PDFRenderer,
  PNGRenderer,
  JPGRenderer,
} from "@cyntler/react-doc-viewer";

const FileViewer = ({ open, onClose, name, selectedFileSize }) => {
  let docs = [
    {
      uri: "https://dxqrkmzagreeiyncplzx.supabase.co/storage/v1/object/sign/TwoKey/sdfd?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJUd29LZXkvc2RmZCIsImlhdCI6MTY5ODU5NzIyMSwiZXhwIjoxNjk5MjAyMDIxfQ.EwbLJZdRTr-YsJ8c2Bq4mIwW3D7PtNp0N2uZVK9lnLQ&t=2023-10-29T16%3A33%3A41.298Z",
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

          <DocViewer
            documents={docs}
            pluginRenderers={[PDFRenderer, JPGRenderer, PNGRenderer]}
          />
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default FileViewer;
