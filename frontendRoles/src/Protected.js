import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { userContext } from "./context";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { user } = useContext(userContext);

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://manthanr.onrender.com/v1/get-user-info/${user.userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileComplete = response.data.is_profile_complete;
      localStorage.setItem(
        "isProfileComplete",
        JSON.stringify(profileComplete)
      );

      return profileComplete;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    let profileStatus = JSON.parse(localStorage.getItem("isProfileComplete"));
    if (profileStatus === null || profileStatus === undefined) {
      profileStatus = fetchUserData();
    }
    const normalizedPathname = pathname.toLowerCase();
    if (!profileStatus) {
      console.log("chala1");

      navigate("/UpdateProfile");
    } else if (profileStatus && normalizedPathname === "/updateprofile") {
      console.log("chala2");

      navigate("/usersection");
    } else if (token && normalizedPathname === "/adminlogin") {
      console.log("chala3");

      navigate("/usersection");
    }
  }, [navigate, pathname]);
  return <Component />;
}
export default Protected;
