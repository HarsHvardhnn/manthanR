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
      <h1 className="font-medium text-sm sm:text-base text-slate-600 ml-2">
        Typing
      </h1>
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

  const axiosConfig = axios.create({
    baseURL: "https://manthanr.onrender.com/v1", // Base URL for API requests
  });

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

    axios
      .get("https://manthanr.onrender.com/v1/getQ", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        const questionsArray = res.data.map((questionObj) => questionObj.text);
        const shuffledQuestions = shuffleArray(questionsArray);
        setQuestions(shuffledQuestions.slice(48));
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, []);

  const handleAnswer = ({ answer }) => {
    setAnswers([
      ...answers,
      { question: questions[currentQuestionIndex], answer },
    ]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex === questions.length - 1) {
      setShowThankYou(true);
    }
  };

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
    axios
      .get(`https://manthanr.onrender.com/v1/user/get-score/${user.userID}`)
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

    const headers = { Authorization: `Bearer ${token}` };

    setIsFetchingData(true);
    axios
      .post(
        "https://manthanr.onrender.com/v1/Doit",
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
          navigate("/usersection");
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
                      Hello {capitalizeFirstLetter(user.username)} ✨
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex ">
                  <button
                    disabled={currentQuestionIndex < 1}
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
                  {currentQuestionIndex === questions.length ? (
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
                                className="ml-2 rounded-full h-9 w-9"
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
                            <img
                              src={bot}
                              alt="logo"
                              className="max-h-9 max-w-9 ml-2 p-1 rounded-full border border-gray-800"
                            />

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
                            {initialQuestionAnswered && (
                              <div className="flex justify-between w-full">
                                <p className="py-1 px-4 ml-1.5 mb-1 w-fit max-w-3xl border border-gray-600 font-medium text-sm sm:text-base rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-md">
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
                                </p>
                                {answers.length > 0 && (
                                  <button
                                    onClick={undoLastQuestion}
                                    className="bg-gray-700 ml-1 sm:mr-4 text-xs text-white font-semibold my-auto py-2 px-3 rounded-xl transition duration-300 ease-in-out shadow-xl transform hover:bg-black hover:scale-105"
                                    title="Undo"
                                  >
                                    {" "}
                                    <FaUndo />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          {initialQuestionAnswered && (
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
                                  setUserScore(userScore + 2);
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

                {showThankYou && (
                  <div className="text-center mt-8 mx-4">
                    <p className="text-2xl font-extrabold uppercase text-green-700 tracking-wide">
                      Thank You for your responses.
                    </p>

                    {/* Mental health score evaluation */}
                    <p className="mt-4 text-lg font-medium text-gray-800 max-w-2xl mx-auto">
                      Your mental health score will be evaluated, and if
                      necessary, steps will be taken to ensure you receive the
                      support you need.
                    </p>

                    {/* Admin notification */}
                    <p className="mt-3 text-base font-semibold text-blue-600 max-w-2xl mx-auto">
                      The data will be reviewed by the admin team.
                    </p>

                    {/* Immediate help message */}
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

                    {/* Submit button */}
                    <p className="mt-4 text-base font-medium text-gray-600">
                      Please click the "Submit" button below to finalize and
                      send your responses.
                    </p>
                  </div>
                )}

                {initialQuestionAnswered &&
                  currentQuestionIndex === questions.length && (
                    <div className="text-center mt-2">
                      <button
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
