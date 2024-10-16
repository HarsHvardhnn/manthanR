import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <Link
      className="bg-white border border-gray-300 rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
      to={`${quiz.name.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <img
        src={quiz.image}
        alt={quiz.name}
        className="object-cover border-b"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{quiz.name}</h2>
        <p className="text-gray-600 mt-2">Gain insights into your mental health and well-being</p>
        <button className="mt-4 text-center cursor-pointer bg-blue-500 hover:bg-blue-600 w-full p-2 text-white rounded-lg font-semibold">Start Quiz</button>
      </div>
    </Link>
  );
};

export default QuizCard;
