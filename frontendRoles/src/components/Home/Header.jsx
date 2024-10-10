import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./newlogo.png";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import DialogModal from "../Admin/DialogModal";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    localStorage.removeItem("user");
    localStorage.removeItem("isProfileComplete");
  };

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="absolute top-0 bg-white font-bold font-montserrat pt-1 sm:px-6 flex flex-wrap justify-between md:justify-between items-center w-full max-w-screen">
        <div className="mx-1 sm:mx-2 rounded-full sm:mb-0.5 flex p-0.5">
          <img
            src={Logo}
            alt="logo"
            className="h-12 sm:h-16 ml-2 lg:ml-6 xl:ml-32"
          />
        </div>
        <div className="hidden md:flex">
          <div>
            {!token ? (
              <button
                onClick={() => {
                  navigate("/");
                }}
                className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-base md:text-lg font-bold sm:mb-2 md:mb-0 text-gray-800 hover:text-blue-600 hover:underline"
              >
                Home
              </button>
            ) : pathname === "/usersection" ? (
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="px-3 py-1 sm:px-6 sm:py-2 rounded-full text-base md:text-lg font-bold sm:mb-2 md:mb-0 text-gray-800 hover:text-blue-600 hover:underline "
              >
                Home
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/usersection");
                }}
                className="px-3 py-1 sm:px-6 sm:py-2 rounded-full text-base md:text-lg font-bold sm:mb-2 md:mb-0 text-gray-800 hover:text-blue-600 hover:underline"
              >
                Dashboard
              </button>
            )}
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/quizzes");
              }}
              className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-base md:text-lg font-bold sm:mb-2 md:mb-0 text-gray-800 hover:text-blue-600 hover:underline "
            >
              Quizzes
            </button>
          </div>{" "}
          <div>
            <button
              onClick={() => {
                navigate("/blogs");
              }}
              className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-base md:text-lg font-bold sm:mb-2 md:mb-0 text-gray-800 hover:text-blue-600 hover:underline "
            >
              Blogs
            </button>
          </div>
          <div>
            <button
              onClick={() =>
                window.open(
                  "https://calendly.com/counselor2-iitp/quickcall",
                  "_blank"
                )
              }
              className="px-3 py-1 sm:px-6 sm:py-2 rounded-full text-base md:text-lg font-bold sm:mb-2 md:mb-0 text-gray-800 hover:text-blue-600 hover:underline "
            >
              Consult
            </button>
          </div>
          
          <div
            className="relative mr-1 sm:mr-2 lg:mr-12 xl:mr-32"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {token ? (
              <button
                className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-base md:text-lg font-bold sm:mb-2 md:mb-0 text-gray-800 hover:text-blue-600 hover:underline "
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={() => setIsDialogOpen(true)}
              >
                Logout
              </button>
            ) : (
              <button
                className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-base md:text-lg font-bold sm:mb-2 md:mb-0 text-gray-800 hover:text-blue-600 hover:underline "
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={() => {
                  navigate("/AdminLogin");
                }}
              >
                Admin
              </button>
            )}
          </div>
        </div>
        <div
          className="md:hidden cursor-pointer text-xl sm:text-2xl mr-2"
          onClick={handleMenu}
        >
          {isMenuOpen ? <IoClose className="text-2xl" /> : <FaBars />}
        </div>

        <DialogModal
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleLogout}
          paragraph="Are you sure you want to logout?"
          closeBtnText="Cancel"
          submitBtnText="Logout"
        />
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute bg-white w-full h-screen z-50 mt-14 sm:mt-16 flex flex-col inset-0  items-center space-y-4 text-lg font-medium font-montserrat">
          <div>
            {!token ? (
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="p-3 font-bold text-lg text-gray-800 mt-16 group-hover:bg-gray-100 hover:text-blue-600 hover:underline"
              >
                Home
              </button>
            ) : pathname === "/usersection" ? (
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="p-3 font-bold text-lg text-gray-800 mt-16 group-hover:bg-gray-100 hover:text-blue-600 hover:underline"
              >
                Home
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/usersection");
                }}
                className="p-3 font-bold text-lg text-gray-800 mt-16 group-hover:bg-gray-100 hover:text-blue-600 hover:underline"
              >
                Dashboard
              </button>
            )}
          </div>
          <div className="group w-full hover:bg-gray-100 flex justify-center">
            <button
              onClick={() => {
                navigate("/quizzes");
              }}
              className="p-3 font-bold text-lg text-gray-800 group-hover:bg-gray-100 hover:text-blue-600 hover:underline"
            >
              Quizzes
            </button>
          </div>{" "}
          <div className="group w-full hover:bg-gray-100 mt-16 flex justify-center">
            {" "}
            <button
              onClick={() => {
                navigate("/blogs");
              }}
              className="p-3 font-bold text-lg text-gray-800 group-hover:bg-gray-100 hover:text-blue-600 hover:underline"
            >
              Blogs
            </button>
          </div>
          <div className="group w-full hover:bg-gray-100 mt-16 flex justify-center">
            <button
              onClick={() =>
                window.open(
                  "https://calendly.com/counselor2-iitp/quickcall",
                  "_blank"
                )
              }
              className="p-3 font-bold text-lg text-gray-800 group-hover:bg-gray-100 hover:text-blue-600 hover:underline"
            >
              Consult
            </button>
          </div>
          <div
            className="relative group w-full hover:bg-gray-100 mt-16 flex justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {token ? (
              <button
                className="p-3 font-bold text-lg text-gray-800 group-hover:bg-gray-100 hover:text-blue-600 hover:underline"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={() => setIsDialogOpen(true)}
              >
                Logout
              </button>
            ) : (
              <button
                className="p-3 font-bold text-lg text-gray-800 group-hover:bg-gray-100 hover:text-blue-600 hover:underline"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={() => {
                  navigate("/AdminLogin");
                }}
              >
                Admin
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
