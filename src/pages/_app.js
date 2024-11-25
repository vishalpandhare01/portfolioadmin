import LayoutComponent from "@/component/layout/layout";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true); // To handle loading state
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      // Redirect if no token is found
      router.push("/"); 
    } else {
      
    }

    setLoading(false); // Stop loading once token check is complete
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking the token
  }

  return (
    <LayoutComponent userName={userName} setUserName={setUserName}>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
