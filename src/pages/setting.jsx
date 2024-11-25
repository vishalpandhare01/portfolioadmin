import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Fade,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseUrl } from "@/const/baseurl";

export default function UserSettings() {
  const [open, setOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [userData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  // Function to handle delete action
  const handleDeleteUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(baseUrl + "/userprofile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user profile");
      }

      setIsDeleted(true); // Mark as deleted after successful response
      setOpen(false); // Close the modal
      alert("User deleted successfully");
    } catch (error) {
      alert("Failed to delete user profile");
    }
  };

  // Open the confirmation modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the confirmation modal without deleting
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          Account Settings
        </Typography>

        {/* User Information */}
        <Paper
          sx={{
            padding: 2,
            marginBottom: 2,
            backgroundColor: "#ffffff",
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Hello, dude!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Make Sure Before Delete
          </Typography>
        </Paper>

        {/* Delete button with icon */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            color="error"
            onClick={handleClickOpen}
            aria-label="delete"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
              backgroundColor: "#f44336",
              color: "#ffffff",
              borderRadius: "8px",
              padding: 1,
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            <DeleteIcon fontSize="large" />
            <Typography variant="button" sx={{ marginLeft: 1 }}>
              Delete Your Profile
            </Typography>
          </IconButton>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "8px" }}>
        <DialogTitle sx={{ backgroundColor: "#f44336", color: "#ffffff" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            color="error"
            sx={{ fontWeight: "bold" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Show confirmation after deletion */}
      <Fade in={isDeleted} timeout={500}>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginTop: 2, textAlign: "center", fontStyle: "italic" }}
        >
          Your account has been successfully deleted.
        </Typography>
      </Fade>
    </Container>
  );
}
