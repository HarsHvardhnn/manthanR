import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "./Header";
import disImage from "./dis.jpg";

const Disclaimer = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const handleSubmit = () => {
    // console.log(user);
    const token = localStorage.getItem("token");

    axios
      .post(
        "https://manthanr.onrender.com/v1/update-tnc",
        { userId: user.userID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("You accepted the terms and conditions");
        // console.log(res)
        navigate("/Chatbot");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center gap-4 items-center bg-blue-200 h-screen font-montserrat">
        <div className="max-w-4xl h-fit bg-white rounded-lg shadow-lg p-6 w-11/12">
          <div className="flex justify-between">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 uppercase underline">
              Disclaimer
            </h2>
            <button
              className="mb-4 bg-blue-500 hover:bg-blue-600 py-1 px-2 text-white rounded-lg"
              onClick={() => {
                navigate("/usersection");
              }}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="flex">
            <p className="text-sm flex-1 sm:text-lg text-justify flex items-center">
              We are going to ask you some questions to determine your mental
              wellness level. We take your privacy seriously. The information
              you provide will be used solely to understand your mental health
              needs and will not be shared with any third parties without your
              consent. Your honest answers will help us support you better.
              Remember, your well-being is our top priority, and we're here to
              provide the assistance you need.
            </p>
            <div className="hidden sm:flex flex-1 justify-center">
              <img
                src={disImage}
                className="size-80 rounded-lg flex-1"
                alt="disclaimer_img"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold sm:font-bold py-2 px-4 rounded text-sm sm:text-base"
          >
            I Understand and Agree
          </button>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
