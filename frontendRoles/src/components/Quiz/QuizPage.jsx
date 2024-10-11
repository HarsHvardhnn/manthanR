import React, { useState } from "react";
import QuizData from "./QuizData";
import QuizCard from "./QuizCard";
import CustomQuiz from "./CustomQuiz";
import Header from "../Home/Header";
import image from "./quiz.jpg"
const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleCardClick = (quiz) => {
    setSelectedQuiz(quiz);
    console.log(quiz);
  };

  const handleQuizComplete = () => {
    setSelectedQuiz(null);
  };

  const quizzesToDisplay = QuizData.quizzes;

  return (
    <>
      <Header />
      <div className="px-4 md:px-8 lg:px-40 py-4 pt-28 min-h-svh sm:min-h-screen font-montserrat bg-blue-50">
        {selectedQuiz ? (
          <CustomQuiz quiz={selectedQuiz} onComplete={handleQuizComplete} />
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center mb-10">
              <div className="md:w-7/12 md:mr-4 mb-4 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">
                  Explore Your Well-Being!
                </h2>
                <p className="text-sm font-medium lg:text-base">
                  Dive into the essential aspects of your mental health and
                  lifestyle choices. Our resources are designed to help you gain
                  valuable insights about yourself and highlight areas where you
                  can grow. Each category provides a unique opportunity to
                  reflect on your well-being and understand your habits better.
                  By taking the time to explore these offerings, you can empower
                  yourself on your journey toward a healthier and more
                  fulfilling life.
                </p>
              </div>
              <div className="md:w-5/12 justify-center">
                <img
                  src={image}
                  alt="Quiz Illustration"
                  className="size-60 lg:size-72 mx-auto rounded-lg"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-8 border-gray-300 border-b pb-2">Available Quizzes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
              {quizzesToDisplay.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onClick={() => handleCardClick(quiz)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuizPage;
