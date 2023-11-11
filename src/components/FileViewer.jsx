import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const FileViewer = () => {
  let docs = [
    {
      uri: "https://dxqrkmzagreeiyncplzx.supabase.co/storage/v1/object/sign/TwoKey/pic?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJUd29LZXkvcGljIiwiaWF0IjoxNjk5Njk3Nzc5LCJleHAiOjE3MzEyMzM3Nzl9.1prm3KP1A6MjGpuYIz4sQ9b81Hs56yXf2ZUBvNLznSE&t=2023-11-11T10%3A16%3A20.122Z",
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
