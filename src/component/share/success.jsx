import React, { useState } from 'react';
import { Snackbar, SnackbarContent, Avatar, Fade, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessNotification = ({open, setOpen}) => {

  // Function to open the snackbar (for testing purposes)
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={(props) => <Fade {...props} />}
      >
        <SnackbarContent
          style={{
            backgroundColor: '#4caf50',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            borderRadius: '8px',
          }}
          message={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt="Success Thumbnail"
                src="https://www.example.com/thumbnail.jpg" // Replace with your thumbnail image
                style={{ width: 40, height: 40, marginRight: 15 }}
              />
              <div>
                <span style={{ fontWeight: 'bold', marginRight: 10 }}>
                  Profile Created Successfully
                </span>
                <CheckCircleIcon style={{ color: '#fff', marginLeft: 10 }} />
              </div>
            </div>
          }
        />
      </Snackbar>
    </div>
  );
};

export default SuccessNotification;
