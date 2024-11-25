import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, IconButton, InputAdornment, Paper, Avatar, LinearProgress } from '@mui/material';
import { Add, Remove, Upload } from '@mui/icons-material';

const AddData = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Title: '',
    Discription: '',
    About: '',
  });

  const [skills, setSkills] = useState([{ name: '', logUrl: '' }]);
  const [services, setServices] = useState([{ name: '', discription: '', photourl: '' }]);
  const [projects, setProjects] = useState([{ title: '', photourl: '', githuburl: '', discription: '', projecturl: '' }]);
  const [socialMedia, setSocialMedia] = useState([{ url: '', logo: '' }]);

  const [files, setFiles] = useState({
    ProfilePic: null,
    Banner: null,
    Logo: null,
    PhotoUrl: null,
  });

  // Calculate form completion progress
  const calculateProgress = () => {
    const totalFields = 11 + skills.length + services.length + projects.length + socialMedia.length;
    let filledFields = 0;

    if (formData.Name) filledFields++;
    if (formData.Phone) filledFields++;
    if (formData.Email) filledFields++;
    if (formData.Title) filledFields++;
    if (formData.Discription) filledFields++;
    if (formData.About) filledFields++;

    skills.forEach(skill => {
      if (skill.name) filledFields++;
    });
    services.forEach(service => {
      if (service.name && service.discription && service.photourl) filledFields++;
    });
    projects.forEach(project => {
      if (project.title && project.githuburl && project.projecturl) filledFields++;
    });
    socialMedia.forEach(sm => {
      if (sm.url && sm.logo) filledFields++;
    });

    // Calculate percentage progress
    return (filledFields / totalFields) * 100;
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(calculateProgress());
  }, [formData, skills, services, projects, socialMedia]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle dynamic addition/removal of Skills, Projects, Services, and Social Media
  const handleAddSkill = () => setSkills([...skills, { name: '', logUrl: '' }]);
  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleAddService = () => setServices([...services, { name: '', discription: '', photourl: '' }]);
  const handleRemoveService = (index) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  const handleAddProject = () => setProjects([...projects, { title: '', photourl: '', githuburl: '', discription: '', projecturl: '' }]);
  const handleRemoveProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleAddSocialMedia = () => setSocialMedia([...socialMedia, { url: '', logo: '' }]);
  const handleRemoveSocialMedia = (index) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia.splice(index, 1);
    setSocialMedia(newSocialMedia);
  };

  // Handle file uploads
  const handleFileChange = (e, field) => {
    setFiles((prev) => ({ ...prev, [field]: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the final form data
    const finalData = {
      ...formData,
      Skills: skills,
      Services: services,
      Projects: projects,
      SocialMedia: socialMedia,
      ProfilePic: files.ProfilePic,
      Banner: files.Banner,
      Logo: files.Logo,
      PhotoUrl: files.PhotoUrl,
    };

    // Convert form data to JSON string and log it
    alert(JSON.stringify(finalData, null, 2));
  };

  return (
    <Box sx={{ position: 'relative' }} className='h-4/5 overflow-y-auto'>
      {/* Sticky Progress Bar */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit} >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            User Information Form
          </Typography>

          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                label="Name"
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                label="Phone"
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                label="Email"
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                label="Title"
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="Discription"
                value={formData.Discription}
                onChange={handleChange}
                label="Description"
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="About"
                value={formData.About}
                onChange={handleChange}
                label="About"
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* File Uploads */}
            <Grid item xs={12} sm={6}>
              <Typography>Profile Picture</Typography>
              <Button variant="contained" component="label">
                Upload
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e, 'ProfilePic')}
                />
              </Button>
              {files.ProfilePic && <Avatar src={URL.createObjectURL(files.ProfilePic)} sx={{ marginTop: 1 }} />}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Banner</Typography>
              <Button variant="contained" component="label">
                Upload
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e, 'Banner')}
                />
              </Button>
              {files.Banner && <img src={URL.createObjectURL(files.Banner)} alt="Banner" width="100%" style={{ marginTop: 8 }} />}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Logo</Typography>
              <Button variant="contained" component="label">
                Upload
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e, 'Logo')}
                />
              </Button>
              {files.Logo && <Avatar src={URL.createObjectURL(files.Logo)} sx={{ marginTop: 1 }} />}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Photo URL</Typography>
              <Button variant="contained" component="label">
                Upload
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e, 'PhotoUrl')}
                />
              </Button>
              {files.PhotoUrl && <img src={URL.createObjectURL(files.PhotoUrl)} alt="Photo" width="100%" style={{ marginTop: 8 }} />}
            </Grid>

            {/* Dynamic Skills */}
            <Grid item xs={12}>
              <Typography variant="h6">Skills</Typography>
              {skills.map((skill, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={5}>
                    <TextField
                      label="Skill Name"
                      value={skill.name}
                      onChange={(e) => {
                        const updatedSkills = [...skills];
                        updatedSkills[index].name = e.target.value;
                        setSkills(updatedSkills);
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="Skill Logo URL"
                      value={skill.logUrl}
                      onChange={(e) => {
                        const updatedSkills = [...skills];
                        updatedSkills[index].logUrl = e.target.value;
                        setSkills(updatedSkills);
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => handleRemoveSkill(index)}>
                      <Remove />
                    </IconButton>
                    {index === skills.length - 1 && (
                      <IconButton onClick={handleAddSkill}>
                        <Add />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* Add more sections for Services, Projects, and Social Media similarly */}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default AddData;
