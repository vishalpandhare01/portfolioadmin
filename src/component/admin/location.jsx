import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

const LocationDetector = ({ latitude, longitude , apiKey}) => {
  const [location, setLocation] = useState({
    latitude: latitude,
    longitude: longitude,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Location Detector
      </Typography>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      )}

      {location && !loading && !error && (
        <>
          <Typography variant="body1">Latitude: {location.latitude}</Typography>
          <Typography variant="body1">
            Longitude: {location.longitude}
          </Typography>

          <Box sx={{ marginTop: 2, width: "100%", height: "300px" }}>
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}Y&center=${location.latitude},${location.longitude}&zoom=12`}
              allowFullScreen
            />
          </Box>
        </>
      )}

      <Button
        variant="contained"
        onClick={() => window.location.reload()}
        sx={{ marginTop: 3 }}
      >
        Refresh Location
      </Button>
    </Box>
  );
};

export default LocationDetector;
