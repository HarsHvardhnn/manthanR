import React, { useState, useEffect } from "react";
import BgImage from "./main.jpg";
import Bg from "./bg.png";
import Bg2 from "./bg-small.png";
import Bg3 from "./bg-mid.png";
import Bg4 from "./bg-lg.png";
import { useNavigate } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";
import "./home.css";
import Header from "./Header";
import Footer from "./Footer";

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
      setBgImageUrl(Bg2);
    } else if (screenWidth > 640 && screenWidth < 1023) {
      setBgImageUrl(Bg3);
    } else if (screenWidth > 1023 && screenWidth < 1280) {
      setBgImageUrl(Bg4);
    } else {
      setBgImageUrl(Bg);
    }

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth < 640) {
        setBgImageUrl(Bg2);
      } else if (newScreenWidth > 640 && newScreenWidth < 1023) {
        setBgImageUrl(Bg3);
      } else if (newScreenWidth > 1023 && newScreenWidth < 1280) {
        setBgImageUrl(Bg4);
      } else {
        setBgImageUrl(Bg);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const superadminToken = localStorage.getItem("superadminToken");
    if (adminToken) {
      navigate("/adminDashboard");
    } else if (superadminToken) {
      navigate("/superadminDashboard");
    }
  }, []);

  return (
    <>
      <div
        className="h-full min-h-svh sm:min-h-screen bg-center bg-no-repeat flex flex-col lg:justify-center items-center font-montserrat main-background"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <Header />

        <div className=" flex flex-col w-full pl-6 items-center ">
          <div className="flex mt-10 w-full justify-center">
            <div className="flex flex-col mt-4 mr-4 xl:mr-28">
              <div className="w-full sm:max-w-xl min-h-48 rounded-lg typewriter-text uppercase">
                <TypeWriterEffect
                  textStyle={{
                    fontFamily: "montserrat",
                    fontWeight: "800",
                  }}
                  startDelay={100}
                  cursorColor="black"
                  text="Your Mental Wealth Matters. Let us help!"
                  typeSpeed={75}
                  hideCursorAfterText="true"
                />
              </div>
              {/* image small */}
              <div className="lg:hidden mx-auto ">
                <img
                  src={BgImage}
                  alt="Description"
                  className="h-56 sm:h-96 animate-custom-bounce image-small"
                  style={{
                    animationDuration: "3s",
                    animationIterationCount: "infinite",
                  }}
                />
              </div>
              <div className=" sm:mb-4 py-2 max-w-xl para">
                <p className="text-base font-medium paragraph ">
                  Enter{" "}
                  <span className="font-bold  text-blue-600">ManoWealth</span> -
                  A Place Where Your Mental Well-being Finds Support, Comfort,
                  and Strength.
                </p>
              </div>
              <div className="flex">
                {loggedin ? null : (
                  <div className="login">
                    <button
                      onClick={() => {
                        navigate("/login");
                        // if (loggedin) {
                        //   navigate("/usersection");
                        // } else {
                        //   navigate("/login");
                        // }
                      }}
                      className="login-btn bg-blue-600 text-white w-fit text-base sm:text-base md:text-lg mb-6 font-semibold sm:font-bold uppercase rounded-full cursor-pointer shadow-lg z-50 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Login
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    navigate("/upcoming-events");
                  }}
                  className={`login-btn ${
                    !loggedin && "ml-4"
                  } bg-white text-blue-600 w-fit text-base sm:text-base md:text-lg mb-6 font-semibold sm:font-bold uppercase rounded-full cursor-pointer shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  Upcoming Events
                </button>
              </div>
            </div>
            {/* image md */}
            <div className="hidden lg:flex md-img">
              <img
                src={BgImage}
                alt="Description"
                className="h-80 xl:h-96 animate-custom-bounce"
                style={{
                  animationDuration: "3s",
                  animationIterationCount: "infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 w-full px-4 lg:px-12 font-montserrat">
        <h2 className="text-2xl lg:text-3xl font-bold text-center text-blue-800 mb-8">
          Important Resources & Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-medium gap-4">
          <div className="p-4 shadow-md rounded-lg min-h-32 flex flex-col justify-between bg-red-200">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Counseling Unit
            </h3>
            <div className="text-sm text-gray-700 mb-2">
              Our counselors assist students in managing academic, personal, and
              emotional challenges to promote a balanced and fulfilling campus
              life. They provide guidance and support to help students thrive
              both inside and outside the classroom.
              <br />
              <div className="flex flex-col ">
                <span className="font-semibold">Email:</span>{" "}
                counselor@university.com{" "}
                <span className="font-semibold">Phone:</span> +91 1234567890
              </div>
            </div>
            <a
              href="/"
              rel="noopener noreferrer"
              className="text-slate-600 underline"
            >
              Visit Counseling Unit
            </a>
          </div>
          <div className="p-4 shadow-md rounded-lg min-h-32 flex flex-col justify-between bg-yellow-200">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Student Association
            </h3>
            <div className="text-sm text-gray-700 mb-2">
              The Student Association promotes leadership, talent, and
              co-curricular engagement through sports, cultural events, and
              major festivals. It plays a key role in students' holistic
              development and building an inclusive campus community.
              <div className="flex flex-col ">
                <span className="font-semibold">Email:</span>{" "}
                studentassociation@university.com{" "}
                <span className="font-semibold">Phone:</span> +91 9876543210
              </div>
            </div>
            <a
              href="/"
              rel="noopener noreferrer"
              className="text-slate-600 underline"
            >
              Visit Student Association
            </a>
          </div>

          <div className="p-4 shadow-md rounded-lg min-h-32 flex flex-col justify-between bg-blue-200">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Cultural Affairs Committee
            </h3>
            <div className="text-sm text-gray-700 mb-2">
              The Cultural Affairs Committee manages cultural activities and
              events, offering students opportunities to showcase their talents
              through various clubs like dance, photography, and more.
              <div className="flex flex-col ">
                <span className="font-semibold">Email:</span>{" "}
                culturalaffairs@university.com{" "}
                <span className="font-semibold">Phone:</span> +91 1122334455
              </div>
            </div>
            <a
              href="/"
              rel="noopener noreferrer"
              className="text-slate-600 underline"
            >
              Visit Cultural Affairs
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MainPage;
