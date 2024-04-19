import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const QuoteCarousel = ({ quotes }) => {
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
    cssEase: "ease-out"
  };

  return (
    <Slider {...settings}>
      {quotes.map((quote, index) => (
        <div key={index}>
          <h2 className="text-2xl text-center font-medium rounded-2xl py-2 max-w-4xl mx-auto mt-2">
            {quote}
          </h2>
        </div>
      ))}
    </Slider>
  );
};

export default QuoteCarousel;
