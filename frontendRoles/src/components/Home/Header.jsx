import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "./Header.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // console.log('path is ' ,pathname)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState(null);
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

  return (
    <div className="absolute top-0 bg-white font-bold font-montserrat pt-1 sm:px-6 flex flex-wrap justify-between md:justify-between items-center w-full max-w-screen">
      <div className="mx-1 sm:mx-2 rounded-full sm:mb-0.5 flex p-0.5">
        <img
          src={Logo}
          alt="logo"
          className="h-8 sm:h-16 ml-0 lg:ml-6 xl:ml-32"
        />
      </div>
      <div className="flex">
        {!token && (
          <div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className=" px-2 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base mr-1 sm:mr-4 sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Home
            </button>
          </div>
        )}

        <div>
          {pathname === "/usersection"
            ? null
            : token && (
                <button
                  onClick={() => {
                    navigate("/UserSection");
                  }}
                  className="px-2 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base mr-1 sm:mr-4 sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Profile
                </button>
              )}
        </div>
        <div
          className="relative mr-1 sm:mr-2 lg:mr-12 xl:mr-32"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {token ? (
            <button
              className=" px-2 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
                localStorage.removeItem('user')
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className=" px-2 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              onClick={() => {navigate("/AdminLogin")}}
            >
              Admin
            </button>
          )}
          {/* {!token && isDropdownOpen && (
            <div className="absolute right-0 sm:left-0 z-10 w-fit bg-white rounded-md shadow-lg ">
              <button
                onClick={() => {
                  navigate("/AdminLogin");
                }}
                className="block py-1 sm:px-2 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100 w-full rounded-lg text-center"
              >
                Admin
              </button>
              <button
                onClick={() => {
                  navigate("/superAdminLogin");
                }}
                className="block py-1 sm:px-2 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100 w-28 rounded-lg text-center"
              >
                SuperAdmin
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Header;
