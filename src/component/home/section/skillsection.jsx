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

const SkillSectionComponent = ({
  portfolioDataSubmission,
  setportfolioDataSubmission,
}) => {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [error, setError] = useState(""); // Store error messages

  // Handle skill addition
  const handleAddSkill = () => {
    if (!skillName || !logoUrl) {
      setError("Both skill name and logo are required.");
      return;
    }

    const newSkill = { name: skillName, logoUrl };
    setSkills([...skills, newSkill]);
    setSkillName("");
    setLogoUrl(""); // Clear the logo URL after adding
    setError(""); // Clear error
  };

  // Handle skill removal
  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  useEffect(() => {
    try {
      if (portfolioDataSubmission.Skills) {
        const skillArray = JSON.parse(portfolioDataSubmission.Skills);
        setSkills(skillArray);
      }
    } catch (error) {
      console.log("Error parsing Skills data:", error);
    }
  }, [portfolioDataSubmission]);

  const handleSaveArray = () => {
    const Skills = JSON.stringify(skills);
    setportfolioDataSubmission((prevData) => ({
      ...prevData,
      Skills,
    }));
    console.log("portfolioDataSubmission", portfolioDataSubmission);
  };

  return (
    <Box sx={{ p: 3, height: "90%", overflow: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add Skills
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Skill Name"
            fullWidth
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Logo URL"
            fullWidth
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSkill}
          >
            Add Skill
          </Button>
        </Grid>
      </Grid>

      {/* Display the added skills in Cards */}
      <Grid container spacing={2}>
        {skills.map((skill, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                height="120"
                image={skill.logoUrl}
                alt={`${skill.name} logo`}
              />
              <CardContent>
                <Typography variant="h6">{skill.name}</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleRemoveSkill(index)} // Remove skill on click
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {skills && skills.length !== 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveArray}
          disabled={skills.length === 0} // Disable the Save button if no skills
        >
          Save
        </Button>
      )}
    </Box>
  );
};

export default SkillSectionComponent;
