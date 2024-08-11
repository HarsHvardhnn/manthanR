import { useEffect } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const SessionManager = () => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        console.log("session nhi hai")
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login"; 
      }
      else{
        console.log("session hai")
      }
    }
  }, []);

  return null;
};

export default SessionManager;
