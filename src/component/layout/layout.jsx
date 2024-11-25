import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Typography as MuiTypography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { baseUrl } from "@/const/baseurl";
import Router from "next/router";

export default function LayoutComponent({ children, userName, setUserName }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // Fetch the user profile when the component is mounted
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the token from session storage
        const token = sessionStorage.getItem("token");

        // Only proceed if the token exists
        if (token) {
          const response = await fetch(baseUrl + "/loginUser", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Adding the token to the header
            },
          });

          const data = await response.json();
          if (data && data.data) {
            setUserName(data.data.UserName); // Store the username in the state
          }
        } else {
          console.error("No auth token found in session storage");
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run only once when the component mounts

  function handleLogout() {
    sessionStorage.clear(); // Clear session storage (including the auth token)
    location.reload(); // Reload the page after logout
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            style={{ cursor: "pointer" }}
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {/* Logout Button */}
          {userName && (
            <IconButton
              color="inherit"
              aria-label="logout"
              title="Logout"
              onClick={() => handleLogout()}
            >
              <ExitToAppIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        sx={{
          width: 240,
          height: "100%",
          zIndex: 1200, // Ensures sidebar is on top of content
          "& .MuiDrawer-paper": {
            width: 240,
            height: "100%",
            boxSizing: "border-box",
          },
        }}
        variant="temporary" // Changed to temporary
        anchor="left"
        open={openSidebar}
        onClose={toggleSidebar} // Added onClose for better control
        ModalProps={{
          keepMounted: true, // Improves performance on mobile
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
          <IconButton onClick={toggleSidebar}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Display the username in the sidebar */}
        <Box sx={{ padding: 2, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ marginRight: 1 }} />
          <MuiTypography variant="body1">
            {userName ? userName : "Unknown"}
          </MuiTypography>
        </Box>

        <Divider />
        {userName && (
          <List>
            <ListItem button style={{ cursor: "pointer" }}>
              <ListItemText primary="Messages" onClick={()=>location.replace("/contacts")} />
            </ListItem>
            <ListItem button style={{ cursor: "pointer" }}>
              <ListItemText primary="Profile" onClick={()=>location.replace("/")} />
            </ListItem>
            <ListItem button style={{ cursor: "pointer" }} >
              <ListItemText primary="Settings" onClick={()=>location.replace("/setting")} />
            </ListItem>
            {/* Add more items as needed */}
          </List>
        )}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: 3,
          marginLeft: 0, // Don't shift the content when sidebar opens
          transition: "none", // No transition needed as we aren't shifting content
          paddingTop: 8, // Adjust for AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
