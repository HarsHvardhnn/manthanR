import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Header from "./Header";

const events = [
  {
    title: "Battling Burnout: Strategies for Academic Stress",
    date: "October 6 - Friday 6pm",
    image: "https://img.freepik.com/premium-photo/trees-growing-forest_1048944-30368869.jpg?w=996",
    description:
      "Focus on managing the intense academic pressures and preventing burnout, a common issue among students in competitive environments like IITs.",
  },
  {
    title: "Mind Matters: Enhancing Focus and Mental Clarity",
    date: "October 13 - Friday 6pm",
    image:
      "https://drive.google.com/uc?export=view&id=1YlINQqywA84-0hGGcZ0nWKxxA15gvmEX",
    description:
      "This session helps students develop techniques for improving concentration and maintaining mental clarity during their studies.",
  },
  {
    title: "Beyond Grades: Building a Resilient Mindset",
    date: "October 20 - Friday 6pm",
    image:
      "https://drive.google.com/uc?export=view&id=180OlGq44LjbHe4Ee_4jeYHdQD3MEbag7",
    description:
      "Encourage students to look beyond academic achievements and cultivate resilience to handle challenges in both their academic and personal lives.",
  },
  {
    title: "Social Support and Mental Health: Building a Strong Network",
    date: "October 27 - Friday 6pm",
    image:
      "https://drive.google.com/uc?export=view&id=1PVRukiwGbqceBpbl6kqC4OyJjvh6SPm-",
    description:
      "Highlight the importance of social connections and how building a supportive network can positively impact mental health during their time at IITs.",
  },
];

function EventsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen py-10 px-4 sm:px-28 font-montserrat bg-blue-100 ">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8 mt-16">
          Upcoming Events
        </h1>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h2>

                <div className="flex items-center text-gray-500 mb-4">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <span className="text-sm">{event.date}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 font-medium">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EventsPage;
