import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const QuoteCarousel = ({ quotes }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <></>, 
    nextArrow: <></>,
    cssEase: "ease-out"
  };

  return (
    <Slider {...settings}>
      {quotes.map((quote, index) => (
        <div key={index}>
          <h2 className="text-lg font-medium rounded-2xl py-2">
            {quote}
          </h2>
        </div>
      ))}
    </Slider>
  );
};

export default QuoteCarousel;
