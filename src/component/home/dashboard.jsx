// DashboardComponent.js
import { baseUrl, portfolioUrl } from "@/const/baseurl";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomModal from "../share/model";
import BasicInformation from "./section/basicinfo";
import SkillSectionComponent from "./section/skillsection";
import ProjectSectionComponent from "./section/projectsection";
import ServiceSectionComponent from "./section/servicessection";
import SocialMediaSectionComponent from "./section/socialmedia";
import LinearWithValueLabel from "../share/progress";
import SuccessNotification from "../share/success";
import CircularColor from "../share/loading";
import UserProfileComponent from "./profile";
import axios from "axios";
import ErrorBoundary from "./ErrorBoundary"; // Import the ErrorBoundary component
import Link from "next/link";

export default function DashboardComponent() {
  const [userName, setUserName] = useState("");
  const [userProfileData, setUserProfileData] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [openSuccessModel, setOpenSuccessModel] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [profileUploadProgress, setProfileUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [portfolioDataSubmission, setportfolioDataSubmission] = useState({
    Name: "",
    Phone: "",
    Email: "",
    ProfilePic: "",
    Banner: "",
    Title: "",
    Discription: "",
    Skills: "",
    Projects: "",
    Services: "",
    About: "",
    SocialMedia: "",
  });
  const [contentNumber, setContentNumber] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.log("No auth token found in session storage");
        }

        const response = await fetch(baseUrl + "/loginUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch user profile data");
        }

        const data = await response.json();
        if (data && data.data) {
          setUserName(data.data.UserName);
          fetchUserPortfolioProfile(data.data.UserName);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert(
          error.message || "An error occurred while fetching user profile."
        );
      }
    };

    fetchUserProfile();
  }, []);

  const fetchUserPortfolioProfile = async (username) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("No auth token found in session storage");
      }

      const response = await fetch(baseUrl + "/userprofile/" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Failed to fetch user portfolio data");
      }

      const data = await response.json();
      if (data && data.data) {
        setUserProfileData(data.data);
      }
    } catch (error) {
      console.error("Error fetching user portfolio profile:", error);
      alert(error.message || "An error occurred while fetching your profile.");
    }
  };

  const submissionComponent = [
    <BasicInformation
      setportfolioDataSubmission={setportfolioDataSubmission}
      portfolioDataSubmission={portfolioDataSubmission}
    />,
    <SkillSectionComponent
      setportfolioDataSubmission={setportfolioDataSubmission}
      portfolioDataSubmission={portfolioDataSubmission}
    />,
    <ProjectSectionComponent
      setportfolioDataSubmission={setportfolioDataSubmission}
      portfolioDataSubmission={portfolioDataSubmission}
    />,
    <ServiceSectionComponent
      setportfolioDataSubmission={setportfolioDataSubmission}
      portfolioDataSubmission={portfolioDataSubmission}
    />,
    <SocialMediaSectionComponent
      setportfolioDataSubmission={setportfolioDataSubmission}
      portfolioDataSubmission={portfolioDataSubmission}
    />,
  ];

  const handleSaveProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token || !userName) {
        console.log("No authentication token or user name found");
      }

      setIsUploading(true);
      setProfileUploadProgress(0);

      if (!portfolioDataSubmission) {
        console.log("No profile data to submit.");
      }

      const response = await axios.post(
        baseUrl + "/userprofile",
        portfolioDataSubmission,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProfileUploadProgress(percent);
            }
          },
        }
      );

      const data = response.data;
      if (data && data.data) {
        setOpenModel(false);
        setOpenSuccessModel(true);
        fetchUserPortfolioProfile(userName)
      } else {
        console.log("Unexpected response structure");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server response error:", error.response.data);
          alert(
            "Error from server: " +
              (error.response.data.message || "Try again later")
          );
        } else if (error.request) {
          console.error("No response from server:", error.request);
          alert(
            "Network error: Unable to reach the server. Please check your internet connection."
          );
        } else {
          console.error("Axios error:", error.message);
          alert("Something went wrong while submitting your profile.");
        }
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 10000);
  }, []);

  const Component = () => (
    <>
      <p className="absolute">
        Note:- We dont have AWS budget yet but we will get soon you can use{" "}
        <a className="text-blue-500" href="https://postimages.org/" target="_blank">
          Postimage
        </a>{" "}
        to upload image and get link
      </p>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={profileUploadProgress} />
      </Box>
      {submissionComponent[contentNumber]}
      <Box
        width="100%"
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
      >
        {contentNumber !== 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setContentNumber(contentNumber - 1)}
          >
            Previous
          </Button>
        )}
        {contentNumber !== submissionComponent.length - 1 ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setContentNumber(contentNumber + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSaveProfile()}
          >
            Submit
          </Button>
        )}
      </Box>
    </>
  );

  return (
    <ErrorBoundary>
      <Box>
        <br />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>
            Hello <b>{userName}</b> Welcome to Dashboard !!!
          </Typography>
        </Box>
        {!userProfileData && (
          <Box>
            <Button
              style={{ margin: "10px" }}
              variant="contained"
              onClick={() => setOpenModel(true)}
            >
              Create Portfolio
            </Button>
          </Box>
        )}
        {!userProfileData && (
          <Box
            height="50vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {showLoading ? (
              <CircularColor />
            ) : (
              <h3 className="text-xl text-blue-400">
                Create Your Portfolio - Nothing in Your Profile
              </h3>
            )}
          </Box>
        )}

        {userProfileData && (
          <Box color="GrayText">
            Portfolio link{" "}
            <b>
              {" "}
              <Link href={portfolioUrl + userName} target="_blank">
                Click
              </Link>
            </b>
          </Box>
        )}

        {userProfileData && (
          <>
            {showLoading ? (
              <CircularColor />
            ) : (
              <UserProfileComponent data={userProfileData} />
            )}
          </>
        )}

        <SuccessNotification
          open={openSuccessModel}
          setOpen={setOpenSuccessModel}
        />
        <CustomModal
          open={openModel}
          setOpen={setOpenModel}
          content={<Component />}
        />
      </Box>
    </ErrorBoundary>
  );
}
