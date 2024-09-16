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
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.get(
        `${apiUrl}/get-user-info/${user.userID}`,
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

      navigate("/UpdateProfile");
    } else if (profileStatus && normalizedPathname === "/updateprofile") {

      navigate("/usersection");
    } else if (token && normalizedPathname === "/adminlogin") {

      navigate("/usersection");
    }
  }, [navigate, pathname]);
  return <Component />;
}
export default Protected;
