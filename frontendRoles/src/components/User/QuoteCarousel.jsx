import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./scrollbar.css";

const QuoteCarousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    prevArrow: <></>,
    nextArrow: <></>,
    cssEase: "ease-out",
    fade: true,
  };

  const quotes = [
    "Your mental health is not a luxury; it's a necessity. Take time to care for your mind.",
    "Your mental health influences every aspect of your life. Make self-care a non-negotiable priority.",
    "Taking care of your mental health is a sign of strength, not weakness.",
    "It's okay to not be okay. Acknowledging your feelings is the first step.",
    "Your feelings are valid. Don't let anyone tell you otherwise.",
    "Healing takes time. Be patient with yourself as you navigate your journey.",
    "Embrace your journey and celebrate small victories along the way.",
    "Don't be afraid to ask for help. It's a sign of courage.",
    "Invest in your mind as you would your body. Both deserve care.",
    "You deserve to take a break. Rest is productive too.",
    "It's okay to set boundaries for your mental health. You come first.",
    "Prioritize activities that uplift your spirit and bring you joy.",
    "Be mindful of your thoughts; they shape your reality.",
    "Allow yourself to feel. Emotions are part of being human.",
    "Your story matters. Share it when you're ready and help others.",
    "Focus on what you can control and let go of the rest.",
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledQuotes = shuffleArray([...quotes]);
  // console.log(shuffledQuotes)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sliderRef.current.slickPause();
      } else {
        sliderRef.current.slickPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Slider ref={sliderRef} {...settings}>
      {shuffledQuotes.map((quote, index) => (
        <div key={index}>
          <h2 className="quote text-xs md:text-base lg:text-sm text-white md:w-full sm:text-user-btns text-left font-medium rounded-2xl max-w-4xl mx-auto sm:mt-2">
             {quote} 
          </h2>
        </div>
      ))}
    </Slider>
  );
};

export default QuoteCarousel;
