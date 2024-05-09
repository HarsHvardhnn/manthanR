import React, { useState, useEffect, useRef } from "react";
// import { questions } from "../../constants/quest";
import bot from "./bot.png";
import { useContext } from "react";
import { authContext, userContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./user.css";
import {
  FaRedo,
  FaSignOutAlt,
  FaUndo,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import emailjs from "emailjs-com";
import Header from "../Home/Header";
import ProgressBar from "@ramonak/react-progress-bar";

const TypingLoader = () => (
  <div className="text-center mt-4 ml-8 mb-4">
    <div className="flex">
      <div className="animate-pulse w-4 h-4 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-pulse w-4 h-4 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-pulse w-4 h-4 bg-gray-400 rounded-full mr-1"></div>
    </div>
  </div>
);

const getHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return "Bearer " + token;
  } else {
    return {};
  }
};

const Survey = () => {
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { user, setUser } = useContext(userContext);
  const { auth, setAuth } = useContext(authContext);
  const [answers, setAnswers] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [pfp, setPfp] = useState("");
  //   const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isFetchingData, setIsFetchingData] = useState(false);
  const axiosConfig = axios.create({
    baseURL: "https://manthanr.onrender.com/v1",
  });

  const emojiMapping = {
    "Strongly Agree": "😄",
    Agree: "😊",
    Undecided: "😑",
    Disagree: "😔",
    "Strongly Disagree": "😞",
  };

  const questions = [
    "Have trouble concentrating on things, such as reading books or remembering things?",
    "Your appetite reduced recently or you are eating excessively?",
    "Do you get tired easily or have little energy?",
    "Have trouble sleeping, or sleeping too much?",
    "Have you been moving or speaking slowly or the opposite being so fidgety or restless that you have been moving around a lot more than usual?",
    "Have your interest in things reduced or you get less pleasure in doing things?",
    "Have you feeling down, depressed, or hopeless?",
    "Have you feeling bad about yourself or that you are a failure or have let yourself or your family down?",
    "Have you ever thought that you would be better off dead, or of hurting yourself?",
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen",
  ];

  const SurveyOption = ({ emoji, text, onSelect, isSelected }) => {
    return (
      <div className={`flex flex-col mx-4 `} onClick={onSelect}>
        <div
          className={`text-xs md:text-lg mx-auto border py-1 mt-1 md:mt-0 px-4 rounded-lg hover:shadow-lg bg-white ${
            isSelected
              ? "border-2 border-survey-bg-dark shadow-lg"
              : "border-gray-600"
          } hover:cursor-pointer`}
        >
          {text}
        </div>
      </div>
    );
  };

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");

  //     axios
  //       .get("https://manthanr.onrender.com/v1/getQ", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         // console.log(res.data);
  //         const questionsArray = res.data.map((questionObj) => questionObj.text);
  //         // console.log(questionsArray); // Log the array of questions
  //         // Now you can set the questions array to state or use it as needed
  //         setQuestions(questionsArray);
  //       })
  //       .catch((err) => {
  //         toast.error(err.response.data);
  //       });
  //   }, []);

  const handleAnswer = (questionIndex, option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = option;
    setAnswers(updatedAnswers);
  };

  const handleSelectOption = (questionIndex, option) => {
    if (!selectedOptions.hasOwnProperty(questionIndex)) {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [questionIndex]: option,
      }));
      handleAnswer(questionIndex, option);
      setAnsweredQuestions(answeredQuestions + 1);
    } else {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [questionIndex]: option,
      }));
      handleAnswer(questionIndex, option);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowThankYou(false);
    setProgress(0);
    setSelectedOptions({});
    setAnsweredQuestions(0);
  };

  const getpfp = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://manthanr.onrender.com/v1/pfp/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPfp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitAns = (values) => {
    const token = localStorage.getItem("token");
    // console.log(token, 'token')

    const headers = { Authorization: `Bearer ${token}` };

    setIsFetchingData(true); // Start loader
    axios
      .post(
        "https://manthanr.onrender.com/v1/Doit",
        {
          email: user.email,
          answers: answers,
          score: userScore,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setIsFetchingData(false); // Stop loader on successful response
        if (res.status === 201) {
          toast.success("Submitted data successfully");
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.message);
        setIsFetchingData(false); // Stop loader on error response
      });
  };

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 800);
      return () => clearTimeout(typingTimeout);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
    }
  }, []);

  useEffect(() => {
    getpfp();
  }, [user]);

  useEffect(() => {
    const newProgress =
      questions.length > 0
        ? Math.floor((answeredQuestions / questions.length) * 100)
        : 0;
    setProgress(newProgress);
  }, [currentQuestionIndex, questions]);

  const getSelectedOption = (questionIndex) => {
    return selectedOptions[questionIndex] || null;
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <>
      <Header />

      <div className="grid grid-cols-4 grid-rows-12 gap-0 h-screen mt-20 font-montserrat sm:px-20 bg-survey-bg2">
        <div className="bg-white text-2xl uppercase font-bold my-auto mx-auto w-full h-full pl-4 pt-4 border border-r-0 ">
          Questions
        </div>
        <div className="bg-white row-span-9 col-start-1 row-start-2 ">
          <div className="max-w-96 pr-2 rounded-tr-xl rounded-tl-xl">
            <div
              className="chat-container overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              <ul className="">
                {questions.map((question, index) => (
                  <li
                    key={index}
                    className={`py-2 px-4 cursor-pointer border text-sm font-medium ${
                      currentQuestionIndex === index ? "bg-survey-bg" : ""
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                    title={question}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {index + 1}. {question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white col-span-3 col-start-2 row-start-1 flex justify-between items-center border">
          <div className="flex items-end">
            <img
              src={pfp}
              alt="logo"
              className="max-h-9 max-w-9 ml-6 my-auto rounded-full border border-gray-800"
            />
            <p className="text-2xl font-semibold ml-2 ">Hi {user.username}</p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-lg mr-10 font-semibold hover:shadow-lg rounded-lg text-white"
          >
            Reset
          </button>
        </div>
        <div className="bg-white col-span-4 md:col-span-3 row-span-7 row-start-2 border-r">
          <div
            className="chat-container bg-survey-bg max-w-6xl mx-auto lg:px-4 py-2 mb-4 min-h-96"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            <div className="chat">
              <div className=" px-2 py-1 rounded-lg text-sm font-medium underline w-fit mx-2 md:mx-6 mt-4 md:mt-12">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              {currentQuestionIndex < questions.length && isTyping && (
                <TypingLoader />
              )}
              {currentQuestionIndex < questions.length && !isTyping && (
                <div
                  id={`question-${currentQuestionIndex}`}
                  className="chat-message px-1 py-2 sm:py-2 sm:px-4 "
                >
                  <div className="flex justify-between">
                    <p className="py-1 px-4 w-fit text-base md:text-2xl font-semibold">
                      {questions[currentQuestionIndex]}
                    </p>
                  </div>
                  <div className="options flex flex-col items-start md:flex-row pt-1 mt-2 font-medium text-2xl">
                    {[
                      "Not at all",
                      "Sometimes",
                      "More than half of the time",
                      "Almost always",
                    ].map((option, idx) => (
                      <SurveyOption
                        key={idx}
                        text={option}
                        onSelect={() =>
                          handleSelectOption(currentQuestionIndex, option)
                        }
                        isSelected={
                          selectedOptions[currentQuestionIndex] === option
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-center w-3/4">
                {currentQuestionIndex > 0 && (
                  <button
                    className="px-4 py-2 bg-white text-gray-800 rounded-md border hover:shadow-lg border-blue-900 mr-4 ml-10 mt-4"
                    onClick={handlePreviousQuestion}
                  >
                    <FaArrowLeft />
                  </button>
                )}
                {currentQuestionIndex < questions.length - 1 && (
                  <button
                    className="px-4 py-2 bg-white text-gray-800 border hover:shadow-lg border-blue-900 rounded-md mt-4"
                    onClick={handleNextQuestion}
                  >
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white col-span-3 col-start-2 row-start-9">
          <div className="w-11/12 mx-auto mt-2">
            <p className="text-center font-semibold text-sm">
              {answeredQuestions} questions answered out of {questions.length}
            </p>
            <ProgressBar
              completed={progress}
              bgColor="#4779e5"
              baseBgColor="#e0e0e0"
              height="6px"
              labelSize="0px"
              borderRadius="5px"
            />
          </div>
        </div>
        {answeredQuestions >= 50 ? (
          <div className="bg-white col-span-3 col-start-2 row-start-10 flex justify-center">
            <button className="px-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 hover:shadow-lg mb-20 text-white rounded-lg">
              Submit
            </button>
          </div>
        ) : (
          <div className="bg-white col-span-3 col-start-2 row-start-10 flex justify-center"></div>
        )}
      </div>
    </>
  );
};

export default Survey;
