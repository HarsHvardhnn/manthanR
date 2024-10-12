import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Dr. Mahendra Ram",
    des: "PIC Wellness",
    institute: "IIT Patna",
    image: "./img/Mahendra_Ram.jpg",
    feedback:
      "The higher educational institutes are known for academic advancements, inventions, and culture. Pursuing this, students go through a lot of mental pressure. For most of the time, this pressure enhances the capabilities of students, but for students who fail to handle it, early intervention is necessary. IIT Patna considers this very essential and urgent. The Manowealth team took this challenge and developed a website as per our requirements. This website helps us identify students early who are struggling, and our institute counselor can directly contact them. We are very happy to have this for our institute.",
  },
  {
    name: "Dr. Sobhakant Pandey",
    des: "Medical Officer",
    institute: "IIT Patna",
    image: "./img/Sobhakant_Pandey.jpg",
    feedback:
      "It's an innovative and transformative experience with Manowealth. The resources and support provided have been invaluable towards better mental health. This platform has truly made a positive impact on the student's life, helping them to feel less alone and more empowered. Thank you for creating such a safe and supportive space!",
  },
  {
    name: "Dr. Udit Satija",
    des: "Gymkhana President",
    institute: "IIT Patna",
    image: "./img/Udit.jpeg",
    feedback:
      "What I like about ManoWealth is the end-to-end platform, do login, take action, and logout. I do not have to email or call counselors or any admin for details. Every detail flows there, just need to observe, act, and summarize. I am quite happy with the platform and new change in the campus for student wellness.",
  },
  {
    name: "Subham Kumar",
    des: "B.Tech Sec",
    institute: "IIT Patna",
    image: "./img/studentpfp.jpg",
    feedback:
      "I used ManoWealth regularly and what I find attractive here is that I have my own panel and I am managing my mental health with someone in guidance at the backend. I also scheduled a call with the counselor and got support in less than 30 minutes, which I was not expecting to be very frank. I am also a secretary of student wellness and seeing the ManoWealth in action makes me quite helpful for us to help needy students.",
  },
  {
    name: "Korak Basu",
    des: "Student",
    institute: "IIT Patna",
    image: "./img/studentpfp.jpg",
    feedback:
      "If you're a student at IIT Patna, I highly recommend using Manowealth. It's easy to access, just log in with your institute email and fill out the chatbot questionnaire. It's a proactive way to manage your mental health and get support before things become too overwhelming. Let's take care of our minds just like we do with our studies.",
  },
  {
    name: "Tanvi Vasoya",
    des: "Student",
    institute: "IIT Patna",
    image: "./img/studentpfp.jpg",
    feedback:
      "As a student, managing academics, personal life, and stress can be overwhelming. Thanks to Manowealth, I now have a monthly check-in on my mental health, which helps me stay on track. The questionnaire is simple, and after submitting it, I get insights into my mental stress levels. Plus, in case of emergencies, the 'SOS' feature lets me reach out for immediate support. It's a great initiative to promote mental well-being among students.",
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

  const { name, institute, feedback, des, image } = testimonials[currentIndex];

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full flex flex-col lg:flex-row max-w-5xl p-8 md:p-12 bg-blue-100 rounded-lg shadow-md relative">
        <p className="text-gray-800 lg:w-3/4 font-medium italic text-lg mb-4">
          "{feedback}"
        </p>

        <div className="flex lg:w-1/4 flex-col items-center ">
          <img
            className="rounded-full size-32 object-cover"
            src={image}
            alt={name}
          />
          <p className="mt-4 font-semibold text-gray-800">{name}</p>
          <p className="text-gray-800">{des}</p>
          <p className="text-sm text-gray-700">{institute}</p>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 ml-1 text-xs md:text-base">
          <button
            onClick={prevTestimonial}
            className="bg-blue-700 text-white p-1.5 md:p-2 rounded-full hover:bg-blue-800"
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 mr-1">
          <button
            onClick={nextTestimonial}
            className="bg-blue-700 text-white p-1.5 md:p-2 rounded-full hover:bg-blue-800"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
