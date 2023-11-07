import React from "react";
import { CssBaseline, Container, Typography, Button, Box } from "@mui/material";

/**
 * ErrorPage component for displaying error messages.
 *
 * @param {Error|string} [props.error] - The error message to display. Defaults to "An error occurred."
 * @returns {JSX.Element} The rendered ErrorPage component.
 */
function ErrorPage({ error, onReload }) {
  return (
    <div className="bg-inherit min-h-screen flex items-center justify-center">
      <div className="bg-inherit rounded-lg shadow-lg p-4 md:p-8 max-w-sm w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">
          Oops, something went wrong!
        </h2>
        <p className="text-gray-600 mb-4">{error || "An error occurred."}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
