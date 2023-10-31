import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const FileViewer = () => {
  let docs = [
    {
      uri: "https://dxqrkmzagreeiyncplzx.supabase.co/storage/v1/object/sign/TwoKey/pic?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJUd29LZXkvcGljIiwiaWF0IjoxNjk4NjkxMzUxLCJleHAiOjE2OTkyOTYxNTF9.bN5QRxFArPQ95uABfMK1bcUC0Hvq3Znldx1htyngexQ&t=2023-10-30T18%3A42%3A30.359Z",
    },
  ];

  return (
    <DocViewer
      prefetchMethod="GET"
      documents={docs}
      pluginRenderers={DocViewerRenderers}
    />
  );
};

export default FileViewer;
