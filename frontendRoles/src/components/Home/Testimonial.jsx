import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Aditya",
    institute: "IIT Patna",
    feedback:
      "It's an innovative and transformative experience with Manowealth. The resources and support provided have been invaluable towards better mental health. This platform has truly made a positive impact on the student's life, helping them to feel less alone and more empowered. Thank you for creating such a safe and supportive space!",
  },
  {
    name: "Dr. Mahendra Ram",
    institute: "IIT Patna",
    feedback:
      "The higher educational institutes are known for academic advancements, inventions, and culture. Pursuing this, students go through a lot of mental pressure. For most of the time, this pressure enhances the capabilities of students, but for students who fail to handle it, early intervention is necessary. IIT Patna considers this very essential and urgent. The Manowealth team took this challenge and developed a website as per our requirements. This website helps us identify students early who are struggling, and our institute counselor can directly contact them. We are very happy to have this for our institute.",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const { name, institute, feedback } = testimonials[currentIndex];

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full max-w-5xl p-12 bg-blue-100 rounded-lg shadow-md relative">
        <p className="text-gray-800 font-medium italic text-lg mb-4">"{feedback}"</p>

        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-lg font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-700">{institute}</p>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 ml-1">
          <button
            onClick={prevTestimonial}
            className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800"
          >
            <FaChevronLeft/>
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 mr-1">
          <button
            onClick={nextTestimonial}
            className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800"
          >
            <FaChevronRight/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
