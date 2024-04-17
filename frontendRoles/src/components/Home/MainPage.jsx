import React, { useState, useEffect } from "react";
import BgImage from "./main6.jpg";
import Bg from "./bg5.png";
import { useNavigate } from "react-router-dom";
import BgImage3 from "./bg-phone.png";
import TypeWriterEffect from "react-typewriter-effect";
import "./home.css";
import BgImage2 from "./bg-tab.png";
import Header from "./Header";

function MainPage() {
  const navigate = useNavigate();
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setLoggedin(false);

    if (token) {
      setLoggedin(true);
    }
  });

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      setBgImageUrl(BgImage3);
    } else if (screenWidth > 640 && screenWidth < 1080) {
      setBgImageUrl(BgImage2);
    } else {
      setBgImageUrl(Bg);
    }

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth < 640) {
        setBgImageUrl(BgImage3);
      } else if (screenWidth > 640 && screenWidth < 1080) {
        setBgImageUrl(BgImage2);
      } else {
        setBgImageUrl(BgImage);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div
      className="h-screen bg-center bg-no-repeat flex flex-col lg:justify-center items-center font-montserrat main-background"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      {/* Navbar */}
      <Header/>

      {/* Content */}
      <div className=" flex flex-col w-full pl-6 items-center ">
        <div className="flex mt-10 w-full justify-center">
          {/* text content */}
          <div className="mt-4 mr-28">
            <div className="w-full sm:max-w-xl min-h-48 rounded-lg typewriter-text uppercase">
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
            <div className="mb-4 py-2  max-w-xl para">
              <p className="text-base font-medium paragraph">
                Enter <span className="font-bold uppercase text-blue-600">ManoWealth</span> -
                A Place Where Your Mental Well-being Finds Support, Comfort, and
                Strength.
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  if (loggedin) {
                    navigate("/Chatbot");
                  } else {
                    navigate("/login");
                  }
                }}
                className="login-btn bg-blue-600 text-white w-fit py-2 px-5 text-base md:text-lg font-semibold rounded-full cursor-pointer shadow-lg z-50 transition duration-300 ease-in-out transform hover:scale-105"
              >
                {loggedin ? "Chatbot" : "Login"}
              </button>
            </div>
          </div>
          {/* image */}
          <div>
            <img src={BgImage} alt="Description" className="h-96 animate-custom-bounce" style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
