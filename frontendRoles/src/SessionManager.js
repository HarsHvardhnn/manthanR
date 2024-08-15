import { useEffect } from "react";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";

const SessionManager = () => {
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          toast.error("Please log in again.");
          window.location.href = "/login"; 
        }
      }
    };

    checkTokenExpiry();

    const intervalId = setInterval(checkTokenExpiry, 120000); 

    return () => clearInterval(intervalId); 
  }, []);

  return null;
};

export default SessionManager;
