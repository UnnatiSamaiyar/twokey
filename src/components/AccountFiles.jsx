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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";
import CheckIcon from "@mui/icons-material/Check";
import ReadIcon from "../assets/read.svg";

const AccountFiles = () => {
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("filteredFiles");
    console.log("filtered files:", JSON.parse(data));
    // console.log("Location:", location.pathname.slice(1));
    setFilteredData(JSON.parse(data));
  }, []);

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
  const [Logs, setLogs] = useState([]);

  const getLogs = async (fileId) => {
    try {
      let token = JSON.parse(sessionStorage.getItem("token"));
      const accessLogs = await axios.get(
        `https://twokeybackend.onrender.com/file/getLogs/access/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );
      console.log(`Logs of id ( ${fileId} ) :`, accessLogs.data);
      setLogs(accessLogs.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowClick = async () => {
    setOpen(!open);
    // Call getLogs only if the row is opened
    if (!open) {
      await getLogs(row.id);
    }
  };

  const formatTimestamp = (timestamp) => {
    const options = {
      timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Date(timestamp).toLocaleString("en-IN", options);
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          cursor: "pointer",
        }}
        onClick={handleRowClick}
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
          <Tooltip title={row.owner} arrow>
            <img
              src={row.publicUrl}
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
              <Stepper activeStep={Logs.length - 1} orientation="vertical">
                {Logs.length > 0 ? (
                  Logs.map((log, index) => (
                    <Step key={index}>
                      <StepLabel
                        icon={
                          <img
                            src={ReadIcon}
                            alt="read"
                            className="bg-indigo-300 rounded-full p-0.5"
                          />
                        }
                      >
                        <div>
                          <p className="text-sm tracking-wide space-x-1">
                            <strong>{log.username}</strong>{" "}
                            <span className="text-gray-600">read</span>{" "}
                            <span className="text-indigo-500 ">file</span>
                            <span className="text-gray-400">
                              on {formatTimestamp(log.timestamp)}
                            </span>
                          </p>
                        </div>
                      </StepLabel>
                    </Step>
                  ))
                ) : (
                  <Step key={0}>
                    <StepLabel icon={<p>.</p>}>
                      <p className="text-center">No logs found!</p>
                    </StepLabel>
                  </Step>
                )}
              </Stepper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default AccountFiles;
