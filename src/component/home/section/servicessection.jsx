import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardMedia,
} from "@mui/material";

const ServiceSectionComponent = ({
  portfolioDataSubmission,
  setportfolioDataSubmission,
}) => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceImageUrl, setServiceImageUrl] = useState("");
  const [serviceLink, setServiceLink] = useState("");

  // Handle service addition
  const handleAddService = () => {
    if (serviceName && serviceDescription && serviceImageUrl && serviceLink) {
      const newService = {
        name: serviceName,
        description: serviceDescription,
        imageUrl: serviceImageUrl,
        link: serviceLink,
      };
      setServices([...services, newService]);
      setServiceName("");
      setServiceDescription("");
      setServiceImageUrl("");
      setServiceLink(""); // Clear the input fields after adding
    }
  };

  // Handle service removal
  const handleRemoveService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  useEffect(() => {
    try {
      if (portfolioDataSubmission.Services) {
        const ServicesArray = JSON.parse(portfolioDataSubmission.Services);
        setServices(ServicesArray);
      }
      console.log("portfolioDataSubmission in useEffect", portfolioDataSubmission);
    } catch (error) {
      console.log("Error parsing portfolioDataSubmission in useEffect", error);
    }
  }, [portfolioDataSubmission]);

  const handleSaveArray = () => {
    const Services = JSON.stringify(services);
    setportfolioDataSubmission((prevData) => ({
      ...prevData,
      Services,
    }));
    console.log("portfolioDataSubmission", portfolioDataSubmission);
  };

  return (
    <Box sx={{ p: 3, height: "90%", overflow: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add Services
      </Typography>

      <Grid width="50%" spacing={2} sx={{ mb: 2 }}>
        {/* Service Name */}
        <Grid item xs={12}>
          <TextField
            label="Service Name"
            fullWidth
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </Grid>

        {/* Service Description (Multiline TextField) */}
        <Grid item xs={12}>
          <TextField
            label="Service Description"
            multiline
            rows={4}
            fullWidth
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
          />
        </Grid>

        {/* Service Image URL */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Service Image URL"
            fullWidth
            value={serviceImageUrl}
            onChange={(e) => setServiceImageUrl(e.target.value)}
          />
        </Grid>

        {/* Service Link */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Service Link"
            fullWidth
            value={serviceLink}
            onChange={(e) => setServiceLink(e.target.value)}
          />
        </Grid>

        {/* Add Service Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddService}
            fullWidth
          >
            Add Service
          </Button>
        </Grid>
      </Grid>

      {/* Display the added services in Cards */}
      <Grid container spacing={2}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                height="140"
                image={service.imageUrl}
                alt={`${service.name} image`}
              />
              <CardContent>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleRemoveService(index)} // Remove service on click
                >
                  Remove
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  href={service.link}
                  target="_blank"
                  sx={{ mt: 1 }}
                >
                  View Service
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {services && services.length !== 0 && (
        <Button variant="contained" color="primary" onClick={handleSaveArray}>
          Save
        </Button>
      )}
    </Box>
  );
};

export default ServiceSectionComponent;
