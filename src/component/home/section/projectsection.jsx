import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Box, Card, CardContent, Typography, Avatar, CardMedia } from "@mui/material";

const ProjectSectionComponent = ({
  portfolioDataSubmission,
  setportfolioDataSubmission,
}) => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImageUrl, setProjectImageUrl] = useState(""); // Now holds the image URL directly
  const [githubUrl, setGithubUrl] = useState("");

  // Handle project addition
  const handleAddProject = () => {
    if (projectName && projectDescription && projectImageUrl && githubUrl) {
      const newProject = { name: projectName, description: projectDescription, imageUrl: projectImageUrl, githubUrl };
      setProjects([...projects, newProject]);
      setProjectName("");
      setProjectDescription("");
      setProjectImageUrl("");
      setGithubUrl(""); // Clear the input fields after adding
    }
  };

  // Handle project removal
  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  useEffect(() => {
    try {
      if (portfolioDataSubmission.Projects) {
        const projectsArray = JSON.parse(portfolioDataSubmission.Projects);
        setProjects(projectsArray);
      }
    } catch (error) {
      console.log("Error in parsing portfolio data:", error);
    }
  }, [portfolioDataSubmission]);

  const handleSaveArray = () => {
    const Projects = JSON.stringify(projects);
    setportfolioDataSubmission((prevData) => ({
      ...prevData,
      Projects,
    }));
    console.log("portfolioDataSubmission", portfolioDataSubmission);
  };

  return (
    <Box sx={{ p: 3, height: "90%", overflow: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add Projects
      </Typography>

      <Grid width="50%" spacing={2} sx={{ mb: 2 }}>
        {/* Project Name */}
        <Grid item xs={12}>
          <TextField
            label="Project Name"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Grid>

        {/* Project Description (Multiline TextField) */}
        <Grid item xs={12}>
          <TextField
            label="Project Description"
            multiline
            rows={4}
            fullWidth
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </Grid>

        {/* Project Image URL */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Project Image URL"
            fullWidth
            value={projectImageUrl}
            onChange={(e) => setProjectImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </Grid>

        {/* GitHub URL */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="GitHub URL"
            fullWidth
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </Grid>

        {/* Add Project Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddProject} fullWidth>
            Add Project
          </Button>
        </Grid>
      </Grid>

      {/* Display the added projects in Cards */}
      <Grid container spacing={2}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                height="140"
                image={project.imageUrl}
                alt={`${project.name} image`}
              />
              <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleRemoveProject(index)} // Remove project on click
                >
                  Remove
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  href={project.githubUrl}
                  target="_blank"
                  sx={{ mt: 1 }}
                >
                  View GitHub
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {projects && projects.length !== 0 && (
        <Button variant="contained" color="primary" onClick={handleSaveArray}>
          Save
        </Button>
      )}
    </Box>
  );
};

export default ProjectSectionComponent;
