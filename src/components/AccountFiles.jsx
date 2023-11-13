import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { supabase } from "../helper/supabaseClient";
import { useLocation } from "react-router-dom";

// Define the formatFileSize function
function formatFileSize(sizeInBytes) {
  const units = ["B", "KB", "MB", "GB"];
  let size = sizeInBytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return size.toFixed(2) + " " + units[unitIndex];
}

const AccountFiles = () => {
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchRecentFiles() {
      try {
        let token = JSON.parse(sessionStorage.getItem("token"));

        const recentFilesFromBackend = await axios.get(
          "https://twokeybackend.onrender.com/file/files/",
          {
            headers: {
              Authorization: `Bearer ${token.session.access_token}`,
            },
          }
        );

        console.log("recentFilesFromBackend", recentFilesFromBackend);

        if (recentFilesFromBackend) {
          const mappedFiles = recentFilesFromBackend.data.map(async (file) => {
            try {
              const { data } = await supabase.storage
                .from("avatar")
                .getPublicUrl(file.owner_email);

              return {
                id: file.id,
                name: file.name.substring(0, 80),
                size: formatFileSize(file.metadata.size),
                dept: file.dept_name,
                publicUrl: data.publicUrl,
                owner: file.owner_email,
                mimetype: file.metadata.mimetype,
                status: "Team",
                security: "Enhanced",
                lastUpdate: new Date(file.metadata.lastModified).toLocaleString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                ),
              };
            } catch (error) {
              console.log("Error while getting public URL:", error);
              return null;
            }
          });

          const resolvedFiles = await Promise.all(mappedFiles);
          const filteredFiles = resolvedFiles.filter((file) => file !== null);
          // console.log("Files:", filteredFiles);

          // Set the filtered files to the state
          // setFilteredData(filteredFiles);
          localStorage.setItem("filteredFiles", JSON.stringify(filteredFiles));
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }

    fetchRecentFiles();
  }, []);

  useEffect(() => {
    let data = localStorage.getItem("filteredFiles");
    console.log("filtered files:", JSON.parse(data));
    // console.log("Location:", location.pathname.slice(1));
    setFilteredData(JSON.parse(data));
  }, []);

  // useEffect(() => {
  //   let data = localStorage.getItem("filteredFiles");
  //   const parsedData = JSON.parse(data);
  //   const filteredByLocation = parsedData.filter((file) =>
  //     file.dept.toLowerCase() === location.pathname.slice(1).toLowerCase()
  //   );

  //   console.log("filtered files:", filteredByLocation);
  //   setFilteredData(filteredByLocation);
  // }, [location.pathname]);

  return (
    <div className="text-center">
      <p className="text-lg text-left font-semibold my-6">Account Files</p>
      <Box sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F7F9FCCC" }}>
                <TableCell />
                <TableCell>FILE NAME</TableCell>
                <TableCell>OWNER</TableCell>
                <TableCell align="center">
                  STATUS
                  <b className="text-gray-50 text-xs bg-gray-500 rounded-full px-[5px] mx-1">
                    i
                  </b>
                </TableCell>
                <TableCell align="center">SIZE</TableCell>
                <TableCell align="center">
                  SECURITY
                  <b className="text-gray-50 text-xs bg-gray-500 rounded-full px-[5px] mx-1">
                    i
                  </b>
                </TableCell>
                <TableCell align="center">LAST UPDATED</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData.map((row) => <Row key={row.id} row={row} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          <p className="text-indigo-600 font-medium">{row.name}</p>
        </TableCell>
        <TableCell align="center">
          <Tooltip title={row.owner}>
            <img
              src={row.publicUrl} // Assuming publicUrl is the URL for the owner's image
              alt="Owner"
              style={{ width: "30px", height: "30px", borderRadius: "10%" }}
            />
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          <p className="bg-gray-100 text-gray-800 rounded-md py-1">
            {row.status}
          </p>
        </TableCell>
        <TableCell align="center">
          <p className="bg-gray-100 text-gray-800 rounded-md py-1">
            {row.size}
          </p>
        </TableCell>
        <TableCell align="center">
          <strong className="bg-green-100 text-green-700  rounded-md py-1 px-4">
            {row.security}
          </strong>
        </TableCell>
        <TableCell align="center">
          <p className="">{row.lastUpdate}</p>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.publicUrl}
              </Typography>
              <Typography variant="body2" gutterBottom component="div">
                {/* Display additional details if needed */}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default AccountFiles;
