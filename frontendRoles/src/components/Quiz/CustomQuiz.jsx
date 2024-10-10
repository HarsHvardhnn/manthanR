import React, { useState } from "react";

const CustomQuiz = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleOptionClick = (questionIndex, optionIndex) => {
    const selectedOption = currentQuestion.options[optionIndex];

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption.score,
    }));
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      calculateScore();
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const calculateScore = () => {
    const score = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    setTotalScore(score);
    setShowResult(true);
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const getResultMessage = () => {
    const { scoring } = quiz;
    let resultMessage = "";

    // Find the score range that matches the total score
    for (const [range, message] of Object.entries(scoring)) {
      const [min, max] = range.split("-").map(Number);
      if (totalScore >= min && totalScore <= max) {
        resultMessage = message;
        break;
      }
    }

    return resultMessage;
  };

  if (showResult) {
    const resultMessage = getResultMessage();

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <div
          className="text-lg text-left bg-gray-100 p-4 rounded-lg"
          dangerouslySetInnerHTML={{ __html: resultMessage }}
        />
        <button
          onClick={onComplete}
          className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto rounded-lg shadow-lg p-6 bg-gradient-to-r from-blue-200 to-blue-300">
      <div className="flex justify-between items-center mb-6 py-2 border-b border-blue-100 border-opacity-50">
        <h2 className="text-3xl font-bold text-gray-700">{quiz.name}</h2>
        <span
          onClick={onComplete}
          className="text-gray-700 hover:text-blue-700 cursor-pointer underline font-medium"
        >
          Back to Quizzes
        </span>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold mb-4 text-gray-700">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </p>
        <ul className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg cursor-pointer text-gray-700 ${
                answers[currentQuestionIndex] === option.score
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              } hover:bg-blue-500 hover:text-white transition-colors`}
              onClick={() => {
                handleOptionClick(currentQuestionIndex, index);
                if (currentQuestionIndex < totalQuestions - 1) {
                  handleNextClick();
                }
              }}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousClick}
          className="px-4 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:bg-gray-200"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-600"
          disabled={answers[currentQuestionIndex] === undefined}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </button>
      </div>

      <div className="w-full bg-gray-300 rounded-full h-2.5 my-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CustomQuiz;
