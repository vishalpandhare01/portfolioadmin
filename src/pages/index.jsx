import Image from "next/image";
import localFont from "next/font/local";
import LoginComponent from "@/component/auth/login";
import { useEffect, useState } from "react";
import SignupComponent from "@/component/auth/singup";
import { useRouter } from "next/router";
import DashboardComponent from "@/component/home/dashboard";
import axios from "axios";
import { baseUrl } from "@/const/baseurl";
import CircularColor from "@/component/share/loading";
import { Box } from "@mui/material";

export default function Home() {
  const [SingUPage, SingUpPage] = useState(false);
  const [showDashBord, setShowDashBord] = useState(false);
  const [isApiReady, setIsApiReady] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      // Redirect if no token is found
      setShowDashBord(true);
    } else {
    }
  }, [router]);

  if (showDashBord) {
    return <DashboardComponent />;
  }

  return (
    <div>
      {!SingUPage ? (
        <LoginComponent SingUpPage={SingUpPage} />
      ) : (
        <SignupComponent SingUpPage={SingUpPage} />
      )}
    </div>
  );
}
