import React, { useEffect, useState } from "react";
import {
  TextField,
  TextareaAutosize,
  Button,
  Avatar,
  Box,
  Grid,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

const BasicInformation = ({
  portfolioDataSubmission,
  setportfolioDataSubmission,
}) => {
  const [saveData, setSaveData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state

  useEffect(() => {
    setSaveData(portfolioDataSubmission);
  }, [portfolioDataSubmission]);

  // Handle form field changes
  const handleFieldChange = (field, value) => {
    setSaveData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  function handleSaveData(e) {
    e.preventDefault();
    setportfolioDataSubmission(saveData);
    setOpenSnackbar(true); // Show success message after saving
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close the snackbar
  };

  return (
    <form onSubmit={handleSaveData} style={{ height: "90%", overflow: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add Basic Information
      </Typography>
      <Box>
        {/* Profile Picture URL Input */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <TextField
            label="Profile Picture URL"
            fullWidth
            value={saveData.ProfilePic || ""}
            onChange={(e) => handleFieldChange("ProfilePic", e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            width: 150,
            height: 150,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={saveData.ProfilePic}
            alt="Profile Picture"
            sx={{ width: 120, height: 120 }}
          />
        </Box>

        {/* Banner Image URL Input */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Banner Image URL"
            fullWidth
            value={saveData.Banner || ""}
            onChange={(e) => handleFieldChange("Banner", e.target.value)}
          />
        </Box>
        <Box
          sx={{
            mb: 2,
            width: "100%",
            height: 200,
            backgroundImage: `url(${saveData.Banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        ></Box>

        {/* Form Inputs Using Grid */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            {/* Name */}
            <TextField
              label="Name"
              fullWidth
              value={saveData.Name || ""}
              onChange={(e) => handleFieldChange("Name", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {/* Phone */}
            <TextField
              label="Phone"
              fullWidth
              value={saveData.Phone || ""}
              onChange={(e) => handleFieldChange("Phone", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {/* Email */}
            <TextField
              label="Email"
              fullWidth
              value={saveData.Email || ""}
              onChange={(e) => handleFieldChange("Email", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {/* Title */}
            <TextField
              label="Title"
              fullWidth
              value={saveData.Title || ""}
              onChange={(e) => handleFieldChange("Title", e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Description Textarea */}
        <Box sx={{ mt: 2 }}>
          <TextareaAutosize
            minRows={5}
            placeholder="Description"
            value={saveData.Discription || ""}
            onChange={(e) => handleFieldChange("Discription", e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "16px",
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextareaAutosize
            minRows={5}
            placeholder="About"
            value={saveData.About || ""}
            onChange={(e) => handleFieldChange("About", e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "16px",
            }}
          />
        </Box>

        {/* Save Button */}
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Automatically close after 3 seconds
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Data saved successfully!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default BasicInformation;
