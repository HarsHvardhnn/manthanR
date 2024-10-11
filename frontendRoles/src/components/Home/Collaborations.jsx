import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./home.css";
// import useSliderVisibilityManagement from "../hooks/useSliderVisibilityManagement";
const Collaborations = () => {
  const sliderRef = useRef(null);
  const collab = [
    {
      title: "Ayushman Bharat Digital Mission",
      description: "Transforming digital healthcare data management.",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7199482988047310849/",
      image: "./img/ABDM.png",
    },
    {
      title: "CDAC Kolkata",
      description: "Collaboration in technology and healthcare.",
      link: "https://www.linkedin.com/posts/clinical-ai-assistance_disaaa-us-empowermentinunity-activity-7180865458009513985-2ANM/?utm_source=share&utm_medium=member_desktop",
      image: "./img/cdac.jfif",
    },
    {
      title: "IIT Patna",
      description: "Academic and research partnership.",
      link: "/",
      image: "./img/IITPatnaLogo.png",
    },
    {
      title: "Startup India",
      description:
        "We are recognized as a Healthcare startup by Startup India.",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7150940824464171008/",
      image: "./img/startup_india.png",
    },
    {
      title: "AIIMS Rishikesh",
      description: "Clinical research and validation.",
      link: "https://timesofindia.indiatimes.com/city/patna/iit-patna-scholars-developing-virtual-doctor-for-early-diagnosis-of-diseases/articleshow/94141545.cms",
      image: "./img/Rishikesh.png",
    },
    {
      title: "NVIDIA",
      description: "Invention and Impact at large scale.",
      link: "/",
      image: "./img/nvidia.png",
    },
  ];

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", borderRadius: "50%" }}
        onClick={onClick}
      >
        <FaAngleRight className="text-blue-500 text-2xl " />
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", borderRadius: "50%" }}
        onClick={onClick}
      >
        <FaAngleLeft className="text-blue-500 text-2xl " />
      </div>
    );
  }

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
          dots: true,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
          dots: true,
          autoplaySpeed: 4000,
        },
      },
    ],
  };

//   useSliderVisibilityManagement(sliderRef);

  return (
    <div className="bg-white px-2 sm:px-20">
      <div className="container mx-auto">
        
        <Slider ref={sliderRef} {...settings}>
          {collab.map((col, index) => (
            <div
              key={index}
              className="p-4 rounded-lg md:rounded-none bg-blue-200 xl:px-2"
            >
              <div
                className="rounded-lg px-2 h-[14rem] md:h-[18rem] bg-white pb-4 cursor-pointer"
                onClick={() => {
                  window.open(col.link, "_blank", "noopener, noreferrer");
                }}
              >
                {" "}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold h-10 sm:h-16 flex items-center justify-center">
                  {col.title}
                </h3>
                <img
                  src={col.image}
                  className="h-32 sm:h-40 mx-auto"
                  alt="Ayushman Bharat Digital Mission"
                />
                <p className="text-gray-600 text-center mt-2 text-sm ">
                  {col.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Collaborations;
