import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
    margin: "auto",
    padding: 3,
  },
  avatar: {
    width: 120,
    height: 120,
    margin: "auto",
  },
  banner: {
    width: "100%",
    height: 200,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    marginTop: 2,
  },
  chip: {
    margin: 0.5,
  },
  sectionTitle: {
    marginTop: 2,
    fontWeight: "bold",
  },
  socialLinks: {
    display: "flex",
    gap: 2,
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 1,
    padding: 16,
    background: "#f5f5f5",
    borderRadius: 8,
  },
  servicesItem: {
    marginBottom: 1,
    padding: 16,
    background: "#f5f5f5",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: 8,
  },
}));

const UserProfile = ({ data }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/* Banner Section */}
      <Box
        className={classes.banner}
        sx={{
          backgroundImage: `url(${data.Banner})`,
        }}
      />

      <CardContent>
        {/* Avatar and Name */}
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt={data.Name}
              src={data.ProfilePic}
              className={classes.avatar}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4">{data.Name}</Typography>
            <Typography variant="subtitle1">{data.Title}</Typography>
          </Grid>
        </Grid>

        {/* Phone, Email */}
        <Box mt={2}>
          <Typography variant="body1">
            <strong>Phone: </strong>
            {data.Phone || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Email: </strong>
            {data.Email || "N/A"}
          </Typography>
        </Box>

        {/* Skills Section */}
        <Box mt={2}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Skills
          </Typography>
          <div className={classes.skills}>
            {data.Skills &&
              JSON.parse(data.Skills).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill.name}
                  avatar={<Avatar alt={skill.name} src={skill.logoUrl} />}
                  className={classes.chip}
                />
              ))}
          </div>
        </Box>

        {/* Description */}
        {data.Discription && (
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Description: </strong>
              {data.Discription}
            </Typography>
          </Box>
        )}

        {/* Projects Section */}
        {data.Projects && JSON.parse(data.Projects).length > 0 && (
          <Box mt={2}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Projects
            </Typography>
            <Grid container spacing={2}>
              {JSON.parse(data.Projects).map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper className={classes.projectItem} elevation={3}>
                    <Box>
                      {/* Project Image */}
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className={classes.image}
                        />
                      )}
                      <Typography variant="subtitle1">{project.name}</Typography>
                      <Typography variant="body2">{project.description}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Services Section */}
        {data.Services && JSON.parse(data.Services).length > 0 && (
          <Box mt={2}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Services
            </Typography>
            <Grid container spacing={2}>
              {JSON.parse(data.Services).map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper className={classes.servicesItem} elevation={3}>
                    <Box>
                      {/* Service Image */}
                      {service.imageUrl && (
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className={classes.image}
                        />
                      )}
                      <Typography variant="subtitle1">{service.name}</Typography>
                      <Typography variant="body2">{service.description}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Social Media Links Section */}
        {data.SocialMedia && JSON.parse(data.SocialMedia).length > 0 && (
          <Box mt={2}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Social Media
            </Typography>
            <div className={classes.socialLinks}>
              {JSON.parse(data.SocialMedia).map((media, index) => (
                <Paper key={index} className={classes.servicesItem} elevation={3}>
                  <Box p={2}>
                    <Typography variant="subtitle1">{media.name}</Typography>
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Chip
                        key={index}
                        label={media.name}
                        avatar={<Avatar alt={media.name} src={media.logoUrl} />}
                        className={classes.chip}
                      />
                    </a>
                  </Box>
                </Paper>
              ))}
            </div>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
