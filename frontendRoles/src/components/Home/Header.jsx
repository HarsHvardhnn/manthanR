import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Header.png";

function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="absolute top-0 bg-white font-bold font-montserrat pt-1 px-6 flex flex-wrap justify-between md:justify-between items-center w-full max-w-screen">
      <div className="mx-2 rounded-full sm:mb-0.5 flex p-0.5">
        <img src={Logo} alt="logo" className="h-10 sm:h-16 lg:ml-16 xl:ml-32" />
      </div>
      <div className="flex">
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className=" px-4 py-2 rounded-full text-xs font-extrabold sm:text-base mr-10 sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Home
          </button>
        </div>
        <div
          className="relative mr-32"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className=" px-4 py-2 rounded-full text-xs font-extrabold sm:text-base sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            Admin
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-fit bg-white rounded-md shadow-lg">
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
    </div>
  );
}

export default Header;
