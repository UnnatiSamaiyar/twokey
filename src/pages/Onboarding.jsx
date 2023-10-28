import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useDropzone } from "react-dropzone";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  border: `1px solid #fff`,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Onboarding = () => {
  const [expanded, setExpanded] = useState("panel1");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    department: "",
    firstName: "",
    lastName: "",
    profilePicture: null,
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can send the formData to your server or perform further actions here.
  };

  const handleNextButtonClick = () => {
    console.log(formData); // Log the formData when the "Next" button is clicked
    // You can perform additional actions here.
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      <div className="text-center p-16">
        <strong className="text-5xl font-raleway">Welcome to TwoKey</strong>
        <p className="text-lg text-gray-400 my-2">
          A secured file sharing platform for companies
        </p>
        <form className="my-4 shadow-lg rounded-lg" onSubmit={handleSubmit}>
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography variant="p" className="text-lg font-semibold">
                  Authentication
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="grid grid-cols-1 md:grid-cols-2 md:gap-4 text-left">
                <div className="mb-4  ">
                  <label className="block text-gray-600 text-sm font-medium p-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="block w-full border rounded-md py-2 px-3"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="mb-4 ">
                  <label className="block text-gray-600 text-sm font-medium p-1">
                    New Password *
                  </label>
                  <input
                    type="password"
                    className="block w-full border rounded-md py-2 px-3"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography variant="p" className="text-lg font-semibold">
                  General Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 text-left">
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium p-1">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      className="block w-full border rounded-md py-2 px-3"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </div>{" "}
                  <div></div>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium p-1">
                      Username
                    </label>
                    <input
                      type="text"
                      className="block w-full border rounded-md py-2 px-3"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium p-1">
                      Department
                    </label>
                    <input
                      type="text"
                      className="block w-full border rounded-md py-2 px-3"
                      placeholder="Enter your department"
                      value={formData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium p-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="block w-full border rounded-md py-2 px-3"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium p-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="block w-full border rounded-md py-2 px-3"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </form>
      </div>
      <footer className="fixed bottom-0 left-0 w-full py-4 text-right p-16 bg-gray-50 bg-opacity-10 backdrop-blur-sm flex justify-between items-center border">
        <Typography variant="p" className="text-sm text-gray-400">
          TwoKey © 2023
        </Typography>
        <button
          type="button"
          onClick={handleNextButtonClick}
          className="rounded-md py-2 px-8 text-white bg-blue-700"
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default Onboarding;
