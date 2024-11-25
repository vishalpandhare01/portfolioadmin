// pages/login.js
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import { LockOutlined as LockIcon } from "@mui/icons-material";
import { useState } from "react";
import { baseUrl } from "@/const/baseurl";
import { useRouter } from "next/router";

const LoginComponent = ({ SingUpPage }) => {
  // State for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the request body
    const requestBody = {
      UserName: userName,
      Password: password,
    };

    try {
      // Send POST request to the login API
      const response = await fetch(baseUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the login is successful
      if (response.ok) {
        const data = await response.json();
        // Save the token in sessionStorage
        sessionStorage.setItem("token", data.data);

        // Handle successful login (e.g., redirect to dashboard or store user data)
       location.reload()
        console.log("Login successful", data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url(https://source.unsplash.com/1600x900/?nature,water)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        sx={{
          width: 400,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ mb: 2, bgcolor: "primary.main" }}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>

        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              {/* Forgot Password? */}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Button variant="text" onClick={() => SingUpPage(true)}> Sign Up</Button>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LoginComponent;
