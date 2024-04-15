import React, { useState, useEffect } from "react";
import BgImage from "./bgimage.png";
import { useNavigate } from "react-router-dom";
import Logo from "./logo.png";
import BgImage3 from "./bg-phone.png"
import TypeWriterEffect from "react-typewriter-effect";
import "./home.css"
import BgImage2 from "./bg-tab.png"


function MainPage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [loggedin, setLoggedin]= useState(false); 

  useEffect(()=>{
    const token = localStorage.getItem("token");
    // const admintoken = localStorage.getItem("adminToken");
    // const superadmintoken = localStorage.getItem("superadminToken");
    setLoggedin(false);

    if(token ){
   setLoggedin(true);
    }
  })


  useEffect(() => {
    // Check the screen size and set the appropriate background image URL
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      setBgImageUrl(BgImage3);
    } else if (screenWidth > 640 && screenWidth < 1080) {
      setBgImageUrl(BgImage2);
    }
    else
    {
      setBgImageUrl(BgImage);
    }

    // Add event listener for screen resize to dynamically update background image
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth < 640) {
        setBgImageUrl(BgImage3);
      } else if (screenWidth > 640 && screenWidth < 1080) {
        setBgImageUrl(BgImage2);
      }
      else
      {
        setBgImageUrl(BgImage);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="h-screen bg-center bg-no-repeat flex flex-col lg:justify-center items-center font-montserrat main-background"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
      }}
    >
            {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
      {/* Navbar */}
      <div className="absolute top-0 bg-white font-bold py-1 px-6 flex flex-wrap justify-between md:justify-between items-center w-full max-w-screen">
        <div className="mx-2 rounded-full sm:mb-2 flex p-0.5">
          <img
            src={Logo}
            alt="logo"
            className="h-10 sm:h-16 lg:ml-16 xl:ml-32 border rounded-full border-black "
          />
        </div>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className=" px-4 py-2 bg-home-bg rounded-full text-xs sm:text-base md:mr-6 lg:mr-20 sm:mb-2 md:mb-0"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            Admin
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 w-fit mt-0.5 bg-white rounded-md shadow-lg">
              <button
                onClick={() => {
                  navigate("/AdminLogin");
                }}
                className="block py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100 w-full rounded-lg text-center"
              >
                Admin
              </button>
              <button
                onClick={() => {
                  navigate("/superAdminLogin");
                }}
                className="block py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100 w-32 rounded-lg text-center"
              >
                Super Admin
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className=" flex flex-col w-full pl-6 py-8 md:items-start md:pl-[15%] ">
        <div className="w-full sm:max-w-xl min-h-40 rounded-lg typewriter-text uppercase">
          <TypeWriterEffect
            textStyle={{
              fontFamily: "montserrat", 
              fontWeight: "800",
            }}
            startDelay={100}
            cursorColor="black"
            text="Your Mental Health Matters. Let us help!"
            typeSpeed={100}
            hideCursorAfterText="true"
          />
        </div>
        <div className="mb-4 py-2 w-1/2 max-w-2xl para">
          <p className="text-base font-medium paragraph">
            Enter <span className="font-bold uppercase">ManoWealth</span> - A Place Where Your Mental Well-being Finds
            Support, Comfort, and Strength.
          </p>
        </div>
        <button
          onClick={() => {
       if(loggedin){
        navigate('/Chatbot')
       }
       else {
        navigate('/login');
       }
          }}
          className="login-btn bg-home-bg w-fit py-2 px-5 text-base md:text-lg font-semibold rounded-full cursor-pointer shadow-lg z-50"
        >
         {
          loggedin?'Go to Home' :('Login')
         }
        </button>
      </div>
    </div>
  );
}

export default MainPage;
