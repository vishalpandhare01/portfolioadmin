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

const SocialMediaSectionComponent = ({
  portfolioDataSubmission,
  setportfolioDataSubmission,
}) => {
  const [socialMediaProfiles, setSocialMediaProfiles] = useState([]);
  const [socialMediaName, setSocialMediaName] = useState("");
  const [socialMediaUrl, setSocialMediaUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  // Handle social media profile addition
  const handleAddProfile = () => {
    if (socialMediaName && socialMediaUrl && logoUrl) {
      const newProfile = {
        name: socialMediaName,
        url: socialMediaUrl,
        logoUrl,
      };
      setSocialMediaProfiles([...socialMediaProfiles, newProfile]);
      setSocialMediaName("");
      setSocialMediaUrl("");
      setLogoUrl(""); // Clear the input fields after adding
    }
  };

  // Handle profile removal
  const handleRemoveProfile = (index) => {
    const updatedProfiles = socialMediaProfiles.filter((_, i) => i !== index);
    setSocialMediaProfiles(updatedProfiles);
  };

  useEffect(() => {
    try {
      if (portfolioDataSubmission.SocialMedia) {
        const socialMedia = JSON.parse(portfolioDataSubmission.SocialMedia);
        setSocialMediaProfiles(socialMedia);
      }
      console.log(
        "portfolioDataSubmission in useEffect",
        portfolioDataSubmission
      );
    } catch (error) {
      console.log("Error parsing portfolioDataSubmission in useEffect", error);
    }
  }, [portfolioDataSubmission]);

  const handleSaveArray = () => {
    const SocialMedia = JSON.stringify(socialMediaProfiles);
    setportfolioDataSubmission((prevData) => ({
      ...prevData,
      SocialMedia,
    }));
    console.log("portfolioDataSubmission", portfolioDataSubmission);
  };

  return (
    <Box sx={{ p: 3, height: "90%", overflow: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add Social Media Profiles
      </Typography>

      <Grid width="50%" spacing={2} sx={{ mb: 2 }}>
        {/* Social Media Name */}
        <Grid item xs={12}>
          <TextField
            label="Social Media Name"
            fullWidth
            value={socialMediaName}
            onChange={(e) => setSocialMediaName(e.target.value)}
          />
        </Grid>

        {/* Social Media URL */}
        <Grid item xs={12}>
          <TextField
            label="Social Media URL"
            fullWidth
            value={socialMediaUrl}
            onChange={(e) => setSocialMediaUrl(e.target.value)}
          />
        </Grid>

        {/* Logo URL (Replace logo upload with URL input) */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Logo URL"
            fullWidth
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </Grid>

        {/* Add Social Media Profile Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProfile}
            fullWidth
          >
            Add Social Media Profile
          </Button>
        </Grid>
      </Grid>

      {/* Display the added social media profiles in Cards */}
      <Grid container spacing={2}>
        {socialMediaProfiles.map((profile, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                height="140"
                image={profile.logoUrl}
                alt={`${profile.name} logo`}
              />
              <CardContent>
                <Typography variant="h6">{profile.name}</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleRemoveProfile(index)} // Remove profile on click
                >
                  Remove
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  href={profile.url}
                  target="_blank"
                  sx={{ mt: 1 }}
                >
                  Visit Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {socialMediaProfiles && socialMediaProfiles.length !== 0 && (
        <Button variant="contained" color="primary" onClick={handleSaveArray}>
          Save
        </Button>
      )}
    </Box>
  );
};

export default SocialMediaSectionComponent;
