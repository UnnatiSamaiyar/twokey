import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const FileViewer = () => {
  let preUrl = localStorage.getItem("preUrl");
  let docs = [
    {
      uri: preUrl,
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
