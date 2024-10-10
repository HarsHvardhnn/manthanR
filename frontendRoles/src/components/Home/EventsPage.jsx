import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Header from "./Header";
import Week1 from "./Week1.jpeg";
import Week2 from "./Week2.jpeg";
import Week3 from "./Week3.jpg";
import Week4 from "./Week4.jpeg";
const events = [
  {
    title: "Battling Burnout: Strategies for Academic Stress",
    date: "October 6 - Friday 6-6:30 PM",
    image: Week1,
    link: "https://meet.google.com/fpv-gnui-szu",
    description:
      "The session aims to discuss focus on managing the intense academic pressures and preventing burnout",
  },
  {
    title: "Mind Matters: Enhancing Focus and Mental Clarity",
    date: "October 13 - Friday 6-6:30 PM",
    image: Week2,
    link: "https://meet.google.com/fpv-gnui-szu",
    description:
      "This session will help an individual to develop techniques for improving concentration and maintaining mental clarity",
  },
  {
    title: "Beyond Grades: Building a Resilient Mindset",
    date: "October 20 - Friday 6-6:30 PM",
    image: Week3,
    link: "https://meet.google.com/fpv-gnui-szu",
    description:
      "Encourage students to look beyond academic achievements and cultivate resilience to handle challenges in both their academic and personal lives.",
  },
  {
    title: "Social Support and Mental Health: Building a Strong Network",
    date: "October 27 - Friday 6-6:30 PM",
    image: Week4,
    link: "https://meet.google.com/fpv-gnui-szu",
    description:
      "Highlight the importance of social connections and how building a supportive network can positively impact mental wealth.",
  },
];

function EventsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen py-10 px-4 lg:px-28 font-montserrat bg-blue-200 ">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-3 mt-16 underline">
          Upcoming Events
        </h1>
        <p className="text-blue-700 text-center font-medium mb-12">
          Discover exciting events happening on campus!
        </p>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div>
                <div className="bg-white">
                  <img
                    src={event.image}
                    alt="event_img"
                    className="object-cover mx-auto h-72 p-4 rounded-lg"
                  />
                </div>
                <div className="p-4 border-t border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer ">
                    {event.title}
                  </h2>

                  <div className="flex items-center text-gray-500 mb-4">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span className="text-sm">{event.date}</span>
                    <span
                      onClick={() => window.open(event.link, "_blank")}
                      className="text-sm underline font-medium ml-2 text-blue-400 cursor-pointer"
                    >
                      Join Session
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 font-medium">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EventsPage;
