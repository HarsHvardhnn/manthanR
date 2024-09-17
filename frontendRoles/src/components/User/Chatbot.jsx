import React, { useState, useEffect, useRef } from "react";
// import { questions } from "../../constants/quest";
import bot from "./chatboticon.jpeg";
import { useContext } from "react";
import { authContext, userContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./scrollbar.css";
import { FaRedo, FaUndo } from "react-icons/fa";
import Header from "../Home/Header";
import Popup from "./Popup";
import ProgressBar from "@ramonak/react-progress-bar";
import DialogModal from "../Admin/DialogModal";
import TypeWriterEffect from "react-typewriter-effect";

const TypingLoader = () => (
  <div className="text-center mt-12 mb-20 ml-4">
    <div className="flex items-center gap-1">
      <img
        src={bot}
        alt="logo"
        className="max-h-9 max-w-9 size-9 ml-2 p-1 rounded-full border border-gray-800"
      />
      <p className="font-medium text-sm sm:text-base text-slate-600 ml-2">
        Typing
      </p>
      <div className="animate-pulse size-1.5 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-pulse size-1.5 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-pulse size-1.5 bg-gray-400 rounded-full mr-1"></div>
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

const Chatbot = () => {
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
  const [score, setScore] = useState("");
  const [thisMonthAnswered, setThisMonthAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [initialResponse, setInitialResponse] = useState("");
  const [remarks, setRemarks] = useState("");
  const [initialQuestionAnswered, setInitialQuestionAnswered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [restartClicked, setRestartClicked] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [hideSubmit, setHideSubmit] = useState(false);
  const [usersScore, setUsersScore] = useState(0);
  const [showSurveyResponse, setShowSurveyResponse] = useState(false);
  const [prevScore, setPrevScore] = useState(0);

  const emojiMapping = {
    "Strongly Agree": "😄",
    Agree: "😊",
    Undecided: "😑",
    Disagree: "😔",
    "Strongly Disagree": "😞",
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .get(`${apiUrl}/getQ`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        const questionsArray = res.data.map((questionObj) => questionObj.text);
        const shuffledQuestions = shuffleArray(questionsArray);
        setQuestions(shuffledQuestions);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, []);

  const deleteFromScore = (answer) => {
    let score = 0;
    switch (answer) {
      case "Strongly Agree":
        score = 5;
        break;
      case "Agree":
        score = 4;
        break;
      case "Undecided":
        score = 3;
        break;
      case "Disagree":
        score = 2;
        break;
      case "Strongly Disagree":
        score = 1;
        break;
      default:
        score = 0;
        break;
    }

    setUserScore((prevScore) => prevScore - score);
  };
  const handleAnswer = ({ answer }) => {
    let score = 0;
    switch (answer) {
      case "Strongly Agree":
        score = 5;
        break;
      case "Agree":
        score = 4;
        break;
      case "Undecided":
        score = 3;
        break;
      case "Disagree":
        score = 2;
        break;
      case "Strongly Disagree":
        score = 1;
        break;
      default:
        score = 0;
        break;
    }

    setUsersScore((prevScore) => prevScore + score);

    setAnswers([
      ...answers,
      { question: questions[currentQuestionIndex], answer },
    ]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex === questions.length - 1) {
      setShowThankYou(true);
    }
  };

  // const handleUndo = ({ answer }) => {
  //   let score = 0;
  //   switch (answer) {
  //     case "Strongly Agree":
  //       score = 5;
  //       break;
  //     case "Agree":
  //       score = 4;
  //       break;
  //     case "Undecided":
  //       score = 3;
  //       break;
  //     case "Disagree":
  //       score = 2;
  //       break;
  //     case "Strongly Disagree":
  //       score = 1;
  //       break;
  //     default:
  //       score = 0;
  //       break;
  //   }
  //   setUsersScore(prevScore => prevScore - score);
  //   console.log(usersScore);

  // };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [answers]);
  const undoLastQuestion = () => {
    if (showThankYou) {
      setShowThankYou(false);
    }
    const newAnswers = [...answers];
    newAnswers.pop();
    // console.log(deletedQuestion.answer)
    // handleUndo(deletedQuestion.answer);

    setAnswers(newAnswers);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleRestart = () => {
    setIsDialogOpen(false);
    setRestartClicked(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowThankYou(false);
    setProgress(0);
  };
  const getScore = () => {
    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .get(`${apiUrl}/user/get-score/${user.userID}`)
      .then((res) => {
        // console.log('res',res);
        setScore(res.data.score);
        if (res.data.score) {
          const dateString = res.data.date;

          const date = new Date(dateString);
          const today = new Date();

          const differenceInMs = today - date;

          const millisecondsInDay = 1000 * 60 * 60 * 24;
          const differenceInDays = Math.floor(
            differenceInMs / millisecondsInDay
          );
          setDaysLeft(30 - differenceInDays);
          const isAtLeast30Days = differenceInDays >= 30;
          if (!isAtLeast30Days) {
            setThisMonthAnswered(true);
          }
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  const getpfp = () => {
    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_URL;

    axios
      .get(`${apiUrl}/pfp/${user.userID}`, {
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

  const calculateScore = (answers) => {
    let totalScore = 0;

    answers.forEach(({ answer }) => {
      let score = 0;
      switch (answer) {
        case "Strongly Agree":
          score = 5;
          break;
        case "Agree":
          score = 4;
          break;
        case "Undecided":
          score = 3;
          break;
        case "Disagree":
          score = 2;
          break;
        case "Strongly Disagree":
          score = 1;
          break;
        default:
          score = 0;
          break;
      }
      totalScore += score;
    });

    return totalScore;
  };
  const submitAns = (values) => {
    const token = localStorage.getItem("token");
    const totalUserScore = calculateScore(answers);
    setUsersScore(totalUserScore);
    const headers = { Authorization: `Bearer ${token}` };
    const apiUrl = process.env.REACT_APP_API_URL;

    setIsFetchingData(true);
    axios
      .post(
        `${apiUrl}/Doit`,
        {
          email: user.email,
          answers: answers,
          score: userScore,
          user_response: initialResponse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setIsFetchingData(false);
        if (res.status === 201) {
          toast.success("Submitted data successfully");
          setSubmitClicked(true);
          setIsDialogOpen(false);
          setHideSubmit(true);
          setShowSurveyResponse(true);
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.message);
        setIsFetchingData(false);
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
    getScore();
    // console.log("score", thisMonthAnswered);
  }, [user]);

  useEffect(() => {
    const newProgress =
      questions.length > 0
        ? Math.floor((currentQuestionIndex / questions.length) * 100)
        : 0;
    setProgress(newProgress);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (thisMonthAnswered) {
      setShowPopup(true);
    }
  }, [thisMonthAnswered]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleInitialSubmit = () => {
    setInitialQuestionAnswered(true);
  };
  const handleExampleClick = (text) => {
    setInitialResponse(text);
  };
  return (
    <>
      <div className="header-container">
        <Header />
      </div>

      <div className=" max-w-full px-4 font-montserrat min-h-svh sm:min-h-screen bg-blue-200 pt-16 md:pt-24">
        {/* <div className="background-animation-wrapper">
          <ul id="shape">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div> */}
        <div className="chat-container-wrapper">
          {showPopup ? (
            <Popup
              onClose={closePopup}
              navigate={navigate}
              daysLeft={daysLeft}
            />
          ) : (
            <>
              <div className="max-w-6xl mx-auto flex justify-between px-4 py-2 bg-blue-500 rounded-tr-xl rounded-tl-xl">
                <div className="flex justify-start">
                  <div>
                    {pfp ? (
                      <img
                        src={pfp}
                        alt="logo"
                        className="ml-2 rounded-full h-9 w-9"
                      />
                    ) : (
                      <div className="ml-2 rounded-full flex items-center justify-center bg-user-bg-small sm:bg-user-btns sm:text-white size-10 font-bold sm:font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="hidden md:flex">
                    <p className="py-2 px-6 bg-white rounded-xl font-bold text-base ml-2">
                      Hello, {capitalizeFirstLetter(user.username)} ✨
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex ">
                  <button
                    disabled={currentQuestionIndex < 1 || showSurveyResponse}
                    onClick={() => {
                      setRestartClicked(true);
                      setIsDialogOpen(true);
                    }}
                    className="bg-white font-bold mx-2 py-2 px-6 disabled:pointer-events-none disabled:transition-none disabled:opacity-85 rounded-xl text-sm transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Restart Chat
                  </button>
                </div>

                <div className="sm:hidden font-bold rounded-lg bg-white my-auto py-1.5">
                  <button
                    disabled={currentQuestionIndex < 1 || showSurveyResponse}
                    onClick={() => {
                      setRestartClicked(true);
                      setIsDialogOpen(true);
                    }}
                    className="my-1 mx-auto px-4 rounded-l-xl text-xs transition duration-300 ease-in-out transform hover:scale-105"
                    title="Restart"
                  >
                    <FaRedo />
                  </button>
                </div>
              </div>

              <div
                ref={chatContainerRef}
                className="chat-container max-w-6xl mx-auto text-lg bg-white lg:px-4 py-2 rounded-br-xl rounded-bl-xl shadow-lg mb-4 min-h-96"
                style={{
                  maxHeight: "calc(100vh - 200px)",
                  overflowY: "scroll",
                }}
              >
                <div className="chat">
                  {currentQuestionIndex === questions.length &&
                  submitClicked ? (
                    questions.length === 0 ? (
                      <p className="text-2xl font-semibold text-center pt-10">
                        Loading...
                      </p>
                    ) : null
                  ) : (
                    // <p className="text-center font-bold text-xl uppercase mt-8 mb-2">
                    //   Survey completed
                    // </p>
                    <>
                      {answers.map((answer, index) => (
                        <div
                          key={index}
                          className="chat-message mb-8 px-1 py-2 sm:p-4"
                        >
                          <div className="flex">
                            {initialQuestionAnswered && (
                              <img
                                src={bot}
                                alt="logo"
                                className="max-h-9 max-w-9 ml-2 p-1 rounded-full border border-gray-800"
                              />
                            )}
                            <p className="py-1 px-4 ml-1.5 mb-1 w-fit text-sm sm:text-base max-w-3xl border border-gray-600 font-medium rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-md">
                              {answer.question}
                            </p>
                            {answers.length > 0 &&
                              index + 1 === answers.length && (
                                <button
                                  onClick={() => {
                                    undoLastQuestion();
                                    deleteFromScore(answer.answer);
                                  }}
                                  className="bg-gray-700 ml-1 sm:mr-4 text-xs text-white font-semibold my-auto py-2 px-3 rounded-xl transition duration-300 ease-in-out shadow-xl transform hover:bg-black hover:scale-105"
                                  title="Undo"
                                >
                                  {" "}
                                  <FaUndo />
                                </button>
                              )}
                          </div>
                          <div className="flex float-right m-1 items-center ">
                            <p
                              className={`py-1 px-4 w-fit text-sm sm:text-xl rounded-tr-full rounded-tl-full rounded-bl-full font-medium text-white bg-blue-500 shadow-md`}
                            >
                              {emojiMapping[answer.answer]}{" "}
                              <span className="text-sm sm:text-base">
                                {answer.answer}
                              </span>
                            </p>
                            {pfp ? (
                              <img
                                src={pfp}
                                alt="logo"
                                className="ml-2 rounded-full h-9 w-9 border border-gray-800"
                              />
                            ) : (
                              <div className="ml-2 rounded-full flex items-center justify-center bg-user-bg-small sm:bg-user-btns sm:text-white size-9 font-bold sm:font-semibold">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {currentQuestionIndex < questions.length && isTyping ? (
                        <TypingLoader />
                      ) : (
                        <div
                          id={`question-${currentQuestionIndex}`}
                          className="chat-message px-1 py-2 sm:p-4 rounded-xl "
                        >
                          <div className="flex">
                            {currentQuestionIndex !== questions.length && (
                              <img
                                src={bot}
                                alt="logo"
                                className="max-h-9 max-w-9 ml-2 p-1 rounded-full border border-gray-800"
                              />
                            )}

                            {!initialQuestionAnswered && (
                              <div className="">
                                <div className="flex flex-col">
                                  <p className="py-1 px-4 ml-1.5 mb-3 w-[90%] border border-gray-600 font-medium text-sm sm:text-base rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-md">
                                    Can you describe how you've been feeling
                                    mentally and emotionally over the past few
                                    weeks?
                                  </p>

                                  <div className="flex gap-1 sm:gap-2 flex-wrap ml-1.5 mb-3">
                                    <button
                                      className="py-1 px-3 bg-blue-500 text-white text-xs sm:text-sm rounded-2xl shadow-md hover:bg-blue-600"
                                      onClick={() =>
                                        handleExampleClick(
                                          "I've been feeling a bit anxious and stressed due to work."
                                        )
                                      }
                                    >
                                      ex. 1
                                    </button>
                                    <button
                                      className="py-1 px-3 bg-blue-500 text-white text-xs sm:text-sm rounded-2xl shadow-md hover:bg-blue-600"
                                      onClick={() =>
                                        handleExampleClick(
                                          "Overall, I've been doing well but sometimes feel a bit down."
                                        )
                                      }
                                    >
                                      ex. 2
                                    </button>
                                    <button
                                      className="py-1 px-3 bg-blue-500 text-white text-xs sm:text-sm rounded-2xl shadow-md hover:bg-blue-600"
                                      onClick={() =>
                                        handleExampleClick(
                                          "I've been having trouble sleeping and it's affecting my mood."
                                        )
                                      }
                                    >
                                      ex. 3
                                    </button>
                                    <button
                                      className="py-1 px-3 bg-blue-500 text-white text-xs sm:text-sm rounded-2xl shadow-md hover:bg-blue-600"
                                      onClick={() =>
                                        handleExampleClick(
                                          "I've been feeling more irritable lately and can't seem to relax."
                                        )
                                      }
                                    >
                                      ex. 4
                                    </button>
                                    <button
                                      className="py-1 px-3 bg-blue-500 text-white text-xs sm:text-sm rounded-2xl shadow-md hover:bg-blue-600"
                                      onClick={() => handleExampleClick("NA")}
                                    >
                                      NA
                                    </button>
                                  </div>

                                  <textarea
                                    className="w-[90%] py-1 sm:py-2 px-2 sm:px-4 border rounded-2xl placeholder:px-1 placeholder:text-[10px] placeholder:leading-3 placeholder:sm:leading-5 placeholder:sm:text-sm font-medium text-sm sm:text-base ml-1.5 border-gray-600 outline-none shadow-md"
                                    rows="6"
                                    placeholder={`For example:
  - "I've been feeling a bit anxious and stressed due to work."
  - "Overall, I've been doing well but sometimes feel a bit down."
  - "I've been having trouble sleeping and it's affecting my mood."
  - "I've been feeling more irritable lately and can't seem to relax."
  If you don't have anything to share, just write 'NA'.`}
                                    value={initialResponse}
                                    style={{ resize: "none" }}
                                    maxLength={500}
                                    onChange={(e) =>
                                      setInitialResponse(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600 mt-2 ml-1.5">
                                    After clicking "Next," you will be asked
                                    some questions to gather information about
                                    your mental health and provide you with
                                    assistance.
                                  </p>
                                  <button
                                    className="bg-blue-500 disabled:text-opacity-60 disabled:hover:bg-blue-500 text-white mt-4 px-4 py-2 rounded-xl text-sm sm:text-base font-semibold ml-1.5 hover:bg-blue-600"
                                    onClick={handleInitialSubmit}
                                    disabled={!initialResponse.trim()}
                                  >
                                    Next
                                  </button>
                                </div>
                              </div>
                            )}
                            {initialQuestionAnswered &&
                              currentQuestionIndex !== questions.length && (
                                <div className="flex justify-between w-full">
                                  <div className="py-1 px-4 ml-1.5 mb-1 w-fit max-w-3xl border border-gray-600 font-medium text-sm sm:text-base rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-md">
                                    <TypeWriterEffect
                                      textStyle={{
                                        fontFamily: "montserrat",
                                      }}
                                      startDelay={10}
                                      cursorColor="black"
                                      text={questions[currentQuestionIndex]}
                                      typeSpeed={20}
                                      hideCursorAfterText="true"
                                    />{" "}
                                  </div>
                                  {/* {answers.length > 0 && (
                                    <button
                                      onClick={undoLastQuestion}
                                      className="bg-gray-700 ml-1 sm:mr-4 text-xs text-white font-semibold my-auto py-2 px-3 rounded-xl transition duration-300 ease-in-out shadow-xl transform hover:bg-black hover:scale-105"
                                      title="Undo"
                                    >
                                      {" "}
                                      <FaUndo />
                                    </button>
                                  )} */}
                                </div>
                              )}
                          </div>
                          {initialQuestionAnswered &&
                            currentQuestionIndex !== questions.length && (
                              <div className="options pl-10 sm:pl-12 pt-1 text-xs sm:text-sm">
                                <button
                                  className="inline-block sm:m-1 px-2 py-1 font-medium transition duration-300 ease-in-out transform hover:scale-105"
                                  onClick={() => {
                                    handleAnswer({
                                      answer: "Strongly Agree",
                                    });
                                    setUserScore(userScore + 5);
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                      😄
                                    </p>
                                    <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal text-center">
                                      Strongly Agree
                                    </p>
                                  </div>
                                </button>
                                <button
                                  className="inline-block sm:m-1 px-2 py-1 font-medium transition duration-300 ease-in-out transform hover:scale-105"
                                  onClick={() => {
                                    handleAnswer({ answer: "Agree" });
                                    setUserScore(userScore + 4);
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                      😊
                                    </p>
                                    <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal ">
                                      Agree
                                    </p>
                                  </div>
                                </button>
                                <button
                                  className="inline-block sm:m-1 px-2 py-1 font-medium transition duration-300 ease-in-out transform hover:scale-105"
                                  onClick={() => {
                                    handleAnswer({ answer: "Undecided" });
                                    setUserScore(userScore + 3);
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                      😑
                                    </p>
                                    <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal ">
                                      Undecided
                                    </p>
                                  </div>
                                </button>
                                <button
                                  className="inline-block sm:m-1 px-2 py-1 font-medium transition duration-300 ease-in-out transform hover:scale-105"
                                  onClick={() => {
                                    handleAnswer({ answer: "Disagree" });
                                    setUserScore(userScore + 2);
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                      😔
                                    </p>
                                    <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal ">
                                      Disagree
                                    </p>
                                  </div>
                                </button>
                                <button
                                  className="inline-block sm:m-1 px-2 py-1  font-medium transition duration-300 ease-in-out transform hover:scale-105"
                                  onClick={() => {
                                    handleAnswer({
                                      answer: "Strongly Disagree",
                                    });
                                    setUserScore(userScore + 1);
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                      😞
                                    </p>
                                    <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal ">
                                      Strongly Disagree
                                    </p>
                                  </div>
                                </button>
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {initialQuestionAnswered &&
                  !showThankYou &&
                  !thisMonthAnswered && (
                    <div className="w-11/12 mx-auto mt-2">
                      <ProgressBar
                        completed={progress}
                        bgColor="#FFB02E"
                        baseBgColor="#e0e0e0"
                        height="20px"
                        labelSize="10px"
                        borderRadius="10px"
                      />
                    </div>
                  )}

                {showSurveyResponse && (
                  <div className="text-center mt-2 mx-2 sm:mx-0 sm:mt-6 ">
                    {usersScore <= 126 && (
                      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 sm:p-6 rounded-lg shadow-md">
                        <p className="text-sm sm:text-lg font-medium mb-4 text-justify">
                          Thank you, {capitalizeFirstLetter(user.username)}, for
                          taking out your valuable time for the assessment. The
                          assessment shows a slightly lower score than expected.
                          This suggests that some areas of your life may need
                          more attention and support. This can be a valuable
                          opportunity to identify challenges and seek resources
                          to improve your well-being.
                        </p>

                        <p className="text-sm text-left sm:text-lg font-medium mt-4">
                          Let us help you to enhance your beautiful life. You're
                          advised to see your institute counselor at Gymkhana
                          for support and strategies.
                        </p>

                        <p className="font-bold text-sm sm:text-base text-left mt-4">
                          Recommended Reading:
                        </p>
                        <ul className="list-disc pl-5 text-left text-xs sm:text-sm  mx-auto">
                          <li>
                            <a
                              href="https://tinybuddha.com/blog/how-i-created-a-beautiful-life-on-the-other-side-of-burnout/"
                              className="hover:underline flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Let us help you to enhance your beautiful life
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://tinybuddha.com/blog/the-amazing-healing-power-of-talking-about-our-anxiety/"
                              className="hover:underline flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Embrace the powerful techniques of healing
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}

                    {usersScore >= 127 && usersScore <= 174 && (
                      <div className="bg-blue-100 border border-blue-400 text-blue-700 p-4 sm:p-6 rounded-lg shadow-md">
                        <p className="text-sm sm:text-lg font-medium mb-4 text-justify">
                          Thank you, {capitalizeFirstLetter(user.username)}, for
                          taking out your valuable time for the assessment. Your
                          moderate score indicates a balanced approach to
                          well-being, with some areas of strength and others
                          that could use more attention. Keep refining your
                          strategies and start self-care practices such as
                          regular exercise and a good sleep cycle.
                        </p>

                        <p className="text-sm sm:text-lg font-medium mt-4">
                          Feel free to talk to your counselor at Gymkhana for
                          more support and strategies.
                        </p>

                        <p className="font-bold text-sm sm:text-base text-left mt-4">
                          Recommended Reading:
                        </p>
                        <ul className="list-disc pl-5 text-left text-xs sm:text-sm">
                          <li>
                            <a
                              href="https://tinybuddha.com/blog/4-fears-that-create-people-pleasers-and-how-to-ease-them/"
                              className="hover:underline flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Let's first accept ourselves to see the magic
                              within.
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://tinybuddha.com/blog/how-i-created-a-beautiful-life-on-the-other-side-of-burnout/"
                              className="hover:underline flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Let us help you to enhance your beautiful life
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}

                    {usersScore >= 175 && (
                      <div className="bg-green-100 border border-green-400 text-green-700 p-4 sm:p-6 rounded-lg shadow-md">
                        <p className="text-sm sm:text-lg font-medium mb-4 text-justify">
                          Thank you, {capitalizeFirstLetter(user.username)}, for
                          taking out your valuable time for the assessment. Your
                          high well-being score reflects a strong sense of
                          overall wellness. Keep up the great work! You're
                          advised to maintain your routine and engage in
                          mindfulness practice.
                        </p>

                        <p className="text-sm sm:text-lg font-medium mt-4">
                          If you feel anything needs improvement, you can visit
                          the institute counselor at Gymkhana for support and
                          strategies.
                        </p>
                        <p className="font-bold text-sm sm:text-base text-left mt-4">
                          Recommended Reading:
                        </p>
                        <ul className="list-disc pl-5 text-left text-xs sm:text-sm ">
                          <li>
                            <a
                              href="https://tinybuddha.com/blog/5-pillars-of-mindful-awareness-that-transformed-my-life/"
                              className="hover:underline flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Strengthen the pillars of Mindfulness
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://tinybuddha.com/blog/4-ways-to-help-someone-with-mental-health-challenges/"
                              className="hover:underline flex items-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              In times of adversity, a little hope can make all
                              the difference. Let's extend that hope by helping
                              someone in need.
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* {showThankYou && (
                  <div className="text-center mt-8 mx-4">
                    <p className="text-2xl font-extrabold uppercase text-green-700 tracking-wide">
                      Thank You for your responses.
                    </p>
                    <p className="mt-4 text-base font-medium text-gray-800">
                      Please click the "Submit" button below to finalize and
                      send your responses.
                    </p>
                    <p className="mt-4 font-medium text-gray-800 text-base max-w-xl mx-auto">
                      Your mental health score will be evaluated, and if
                      necessary, steps will be taken to ensure you receive the
                      support you need.
                    </p>

                    <p className="mt-3 text-base font-semibold text-blue-600 max-w-2xl mx-auto">
                      The data will be reviewed by the admin team.
                    </p>

                    <div className="mt-6 bg-blue-100 border-l-4 border-blue-600 p-4 max-w-xl mx-auto rounded-lg shadow-md">
                      <p className="text-sm font-bold text-blue-700">
                        Need help now?
                        <span className="font-extrabold text-blue-800">
                          {" "}
                          Click "Consult"
                        </span>{" "}
                        in the dashboard for immediate support.
                      </p>
                    </div>
                  </div>
                )} */}

                {initialQuestionAnswered &&
                  !hideSubmit &&
                  currentQuestionIndex === questions.length && (
                    <div className="text-center mt-2">
                      <button
                        disabled={userScore === 0}
                        onClick={() => setIsDialogOpen(true)}
                        className="mt-3 bg-blue-600 text-white text-lg font-semibold py-2 px-6 rounded-xl shadow-xl hover:bg-blue-800 hover:scale-105 transition transform duration-300 ease-in-out"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </div>
            </>
          )}
        </div>
        <DialogModal
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={restartClicked ? handleRestart : submitAns}
          paragraph={`${
            restartClicked
              ? "Restart chat and clear conversation?"
              : "Are you sure you want to submit your responses?"
          } `}
          closeBtnText="Cancel"
          submitBtnText={`${restartClicked ? "Restart" : "Submit"} `}
        />
      </div>
    </>
  );
};

export default Chatbot;
