import React from "react";
import { useDarkMode } from "../context/darkModeContext";

/**
 * ErrorPage component displays an error message in a styled container.
 *
 * @param {string} [props.error] - The error message to display. Defaults to "An error occurred."
 * @returns {JSX.Element} The rendered ErrorPage component.
 */
function ErrorPage({ error }) {
  const isDarkMode = useDarkMode();
  return (
    <div
      className={`${
        isDarkMode.darkMode ? "bg-gray-800" : "bg-white"
      } min-h-screen flex items-center justify-center text-center`}
    >
      <div className="bg-inherit rounded-lg shadow-lg p-4 md:p-8 max-w-sm w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600 ">
          Oops, something went wrong!
        </h2>
        <p
          className={`${
            isDarkMode.darkMode ? "text-gray-400" : "text-gray-600"
          } mb-4`}
        >
          {error || "An error occurred."}
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
