import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { supabase } from "../helper/supabaseClient";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width: "60vw",
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
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const depData = async () => {
      try {
        let token = JSON.parse(sessionStorage.getItem("token"));
        const dep = await axios.get(
          "https://twokeybackend.onrender.com/dept/list_depts/",
          {
            headers: {
              Authorization: `Bearer ${token.session.access_token}`,
            },
          }
        );
        console.log("Departments:", dep.data);
        setDepartmentList(dep.data);
      } catch (error) {
        console.log("Error fetching departments");
      }
    };

    depData();
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFormData({
        ...formData,
        profilePicture: file,
      });
      setIsPictureSelected(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    maxFiles: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };

  // const handleNextButtonClick = async () => {
  //   console.log(formData);

  //   try {
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email: formData.email,
  //       password: formData.password,
  //     });

  //     if (error) throw error;

  //     if (data) {
  //       const { data, error } = await supabase
  //         .from("user_info")
  //         .update({ other_column: "otherValue" })
  //         .eq("some_column", "someValue")
  //         .select();

  //       handleProfilePictureUpload();
  //       sessionStorage.setItem("token", JSON.stringify(data));
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const handleNextButtonClick = async () => {
    console.log(formData);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data) {
        // Update user_info with firm data
        const { data: userData, error: updateError } = await supabase
          .from("user_info")
          .update({
            username: formData.username,
            department: formData.department,
            firstname: formData.firstName,
            lastname: formData.lastName,
          })
          .eq("id", data.user.id)
          .single();

        if (updateError) {
          console.error("Error updating user_info:", updateError);
        } else {
          console.log("User info updated successfully:", userData);
          handleProfilePictureUpload();
          sessionStorage.setItem("token", JSON.stringify(data));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleProfilePictureUpload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("avatar")
        .upload("testSuccess", formData.profilePicture, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Error occurred in file upload:", error);
      } else {
        console.log("File uploaded successfully:", data);
      }
    } catch (error) {
      console.error(
        "An error occurred while uploading the profile picture:",
        error
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      <div className="text-center p-16">
        <strong className="text-5xl font-raleway">Welcome to TwoKey</strong>
        <p className="text-lg text-gray-400 my-2">
          A secured file sharing platform for companies
        </p>
        <form className="my-16 shadow-lg rounded-lg" onSubmit={handleSubmit}>
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
                <div className="mb-4">
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
                <div className="mb-4">
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
                    {isPictureSelected ? (
                      <img
                        src={URL.createObjectURL(formData.profilePicture)}
                        alt="Profile Pic"
                        className="mt-2 max-h-40 max-w-full rounded-md"
                      />
                    ) : (
                      <div
                        {...getRootProps()}
                        className="mt-2 h-28 w-32 hover:text-blue-400 flex items-center justify-center border-2 border-dashed hover:border-blue-400 border-gray-400 p-4 rounded-md text-center cursor-pointer"
                      >
                        <input {...getInputProps()} />
                        <p>Drop files to upload</p>
                      </div>
                    )}
                  </div>
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

                    <Select
                      className="w-full bg-gray-100"
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={formData.department}
                      label="Departments"
                      name="Departments"
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      size="small"
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>

                      {departmentList.length &&
                        departmentList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
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
          type="submit"
          onClick={() => {
            handleNextButtonClick();
            // handleProfilePictureUpload();
          }}
          className="rounded-md py-2 px-8 text-white bg-blue-700"
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default Onboarding;
