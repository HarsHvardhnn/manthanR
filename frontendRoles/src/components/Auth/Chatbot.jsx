import React, { useState, useEffect, useRef } from "react";
// import { questions } from "../../constants/quest";
import bot from "./Robot.jpg";
import { useContext } from "react";
import { authContext, userContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import "./scrollbar.css";
import { FaRedo, FaSignOutAlt, FaUndo } from "react-icons/fa";

const TypingLoader = () => (
  <div className="text-center mt-4 ml-8 mb-4">
    <div className="flex">
      <div className="animate-pulse w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-pulse w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-pulse w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
    </div>
  </div>
);

const Chatbot = () => {
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { user } = useContext(userContext);
  const { auth, setAuth } = useContext(authContext);
  const [answers, setAnswers] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [questions,setQuestions] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false); // New state for loader


  useEffect(() => {
    axios.get('http://localhost:4000/v1/getQ')
      .then((res) => {
        console.log(res.data);
        const questionsArray = res.data.map(questionObj => questionObj.text);
        // console.log(questionsArray); // Log the array of questions
        // Now you can set the questions array to state or use it as needed
        setQuestions(questionsArray);
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
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowThankYou(false);
    setProgress(0);
  };

  const submitAns = (values) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    console.log(token, 'token')
    
    // Set the default Authorization header for this request
    const headers = { Authorization: `Bearer ${token}` };

    setIsFetchingData(true); // Start loader
    axios
      .post("http://localhost:4000/v1/Doit", {
        email: user,
        answers: answers,
        score: userScore,
      }, { headers })
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
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
  },[])
  useEffect(() => {
    const newProgress = questions.length > 0 ? Math.floor((currentQuestionIndex / questions.length) * 100) : 0;
    setProgress(newProgress);
  }, [currentQuestionIndex, questions]);

  return (
    <div className="max-w-full px-4 lg:px-12 pt-4 pb-24 font-montserrat h-screen bg-blue-200">
      <div className="max-w-6xl mx-auto flex justify-between px-4 py-2 bg-blue-500 rounded-tr-xl rounded-tl-xl">
        <div>
          <img
            src={bot}
            alt="logo"
            className="max-h-10 max-w-10 ml-2 rounded-full"
          />
        </div>
        <div>
          <p className="py-2 px-4 bg-white rounded-xl font-bold text-base">
           Hello  {user} ✨
          </p>
        </div>
        <div className="hidden sm:flex">
          <button
            onClick={handleRestart}
            className="bg-white font-bold mx-2 py-2 px-4 rounded-xl text-sm transition duration-300 ease-in-out transform hover:scale-105"
          >
            Restart Chat
          </button>
          <button
            onClick={() => {
              // console.log(auth);
              setAuth(false);
              localStorage.removeItem('token');
              navigate("/login");
              // console.log(auth);
            }}
            className="bg-white font-bold py-2 px-4 rounded-xl text-sm transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>

        <div className="sm:hidden font-bold rounded-lg bg-white flex">
          <button
            onClick={handleRestart}
            className="my-1 mx-auto px-2 border-r rounded-l-xl text-xs transition duration-300 ease-in-out transform hover:scale-105"
            title="Restart"
          >
            <FaRedo/>
          </button>
          <button
            onClick={() => {
              // console.log(auth);
              setAuth(false);
              navigate("/login");
              // console.log(auth);
            }}
            className="my-1 mx-auto px-2 border-l rounded-r-xl text-xs transition duration-300 ease-in-out transform hover:scale-105"
            title="Logout"
          >
            <FaSignOutAlt/>
          </button>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="chat-container max-w-6xl mx-auto text-lg bg-white px-1 py-2 rounded-br-xl rounded-bl-xl shadow-lg mb-4 min-h-52"
        style={{ maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
      >
        <div className="chat">
          {answers.map((answer, index) => (
            <div key={index} className="chat-message mb-8 px-1 py-2 sm:p-4">
              <div className="flex">
                <img
                  src={bot}
                  alt="logo"
                  className="max-h-9 max-w-9 ml-2 rounded-full"
                />
                <p className="py-1 px-4 ml-1.5 mb-1 w-fit text-sm sm:text-base max-w-3xl border border-gray-600 font-medium rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-md">
                  {answer.question}
                </p>
              </div>
              <p
                className={`py-1 px-4 m-2 w-fit text-sm sm:text-base rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl float-right font-medium text-white bg-blue-500 shadow-md`}
              >
                {answer.answer}
              </p>
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
                  className="max-h-9 max-w-9 ml-2 rounded-full"
                />
                <div className="flex justify-between w-full">
                  <p className="py-1 px-4 ml-1.5 mb-1 w-fit max-w-3xl border border-gray-600 font-medium text-sm sm:text-base rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-md">
                    {questions[currentQuestionIndex]}
                  </p>
                  {answers.length > 0 && (
                    <button
                      onClick={undoLastQuestion}
                      className="bg-gray-700 ml-1 sm:mr-4 text-xs text-white font-semibold my-auto py-2 px-3 rounded-xl transition duration-300 ease-in-out shadow-xl transform hover:bg-black hover:scale-105"
                      title="Undo"
                    >
                      {" "}
                      <FaUndo/>
                    </button>
                  )}
                </div>
              </div>
              <div className="options pl-12 pt-1 text-xs sm:text-sm">
                <button
                  className="inline-block m-1 px-2 sm:px-4 py-1 border border-gray-600 font-medium rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    handleAnswer({
                      answer: "Strongly Agree",
                    });
                    setUserScore(userScore + 5);
                  }}
                >
                  Strongly Agree
                </button>
                <button
                  className="inline-block m-1 px-2 sm:px-4 py-1 border border-gray-600 font-medium rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    handleAnswer({ answer: "Agree" });
                    setUserScore(userScore + 2);
                  }}
                >
                  Agree
                </button>
                <button
                  className="inline-block m-1 px-2 sm:px-4 py-1 border border-gray-600 font-medium rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    handleAnswer({ answer: "Undecided" });
                    setUserScore(userScore + 3);
                  }}
                >
                  Undecided
                </button>
                <button
                  className="inline-block m-1 px-2 sm:px-4 py-1 border border-gray-600 font-medium rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    handleAnswer({ answer: "Disagree" });
                    setUserScore(userScore + 2);
                  }}
                >
                  Disagree
                </button>
                <button
                  className="inline-block m-1 px-2 sm:px-4 py-1 border border-gray-600 font-medium rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    handleAnswer({
                      answer: "Strongly Disagree",
                    });
                    setUserScore(userScore + 1);
                  }}
                >
                  Strongly Disagree
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <ProgressBar width={progress} />
      </div>
      {showThankYou && (
        <div className="text-center mt-2">
          <p className="text-base sm:text-xl font-bold">Thank You for Your Responses!</p>
        </div>
      )}
      {currentQuestionIndex === questions.length && (
        <div className="text-center mt-2">
          <button
            onClick={() => {
              // console.log(userScore);
              // console.log("submitted");
              submitAns();
              // console.log(answers)
            }}
            className="bg-white font-bold py-1 px-4 text-sm sm:text-base rounded-xl border border-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
