import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./scrollbar.css"
const QuoteCarousel = () => {
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

  const quotes = [
    "Just as you prioritize your physical health, remember to nurture your mental well-being daily.",
    "Your mental health is not a luxury; it's a necessity. Take time to care for your mind.",
    "In a world that values productivity, remember that mental well-being is essential for true success.",
    "Your mental health influences every aspect of your life. Make self-care a non-negotiable priority.",
    "Mental wellness isn't just about avoiding illness; it's about thriving. Prioritize your mental health.",
    "Self-care is giving the world the best of you, not what's left of you.",
    "Taking care of your mental health is a sign of strength, not weakness.",
    "You can't pour from an empty cup. Take care of yourself first.",
    "It's okay to not be okay. Acknowledging your feelings is the first step.",
    "Your feelings are valid. Don't let anyone tell you otherwise.",
    "Healing takes time. Be patient with yourself as you navigate your journey.",
    "Mental health matters. Speak up, seek help, and support each other.",
    "You are not alone in your struggles; reach out for support when needed.",
    "Embrace your journey and celebrate small victories along the way.",
    "Your mental health is a priority; don't neglect it for anyone or anything.",
    "Progress is not linear. It's okay to have ups and downs.",
    "Breathe. It's just a bad day, not a bad life.",
    "Don't be afraid to ask for help. It's a sign of courage.",
    "The mind is a powerful thing. Nurture it with kindness.",
    "Be gentle with yourself. You're doing the best you can.",
    "Every day may not be good, but there's something good in every day.",
    "Take a deep breath. You are stronger than you think.",
    "Small steps every day lead to significant progress over time.",
    "Mental health is just as important as physical health; prioritize both.",
    "Invest in your mind as you would your body. Both deserve care.",
    "You deserve to take a break. Rest is productive too.",
    "Your mental wellness journey is uniquely yours. Embrace it without comparison.",
    "It's okay to set boundaries for your mental health. You come first.",
    "Focus on what you can control and let go of the rest.",
    "Every moment of self-care is a moment of self-love.",
    "You are worthy of love, care, and respect. Never forget that.",
    "Challenge negative thoughts. Your mind can be your greatest ally or worst enemy.",
    "Prioritize activities that uplift your spirit and bring you joy.",
    "Be mindful of your thoughts; they shape your reality.",
    "Healing is a journey, not a destination. Enjoy the ride.",
    "Allow yourself to feel. Emotions are part of being human.",
    "Practice gratitude daily. It shifts your mindset toward positivity.",
    "Surround yourself with those who uplift you and encourage growth.",
    "It's okay to pause and take a moment for yourself.",
    "Celebrate your progress, no matter how small. Each step matters.",
    "Mental health is a journey, not a race. Take your time.",
    "You are not defined by your struggles but how you overcome them.",
    "Your story matters. Share it when you're ready and help others.",
    "Believe in your strength. You have overcome challenges before, and you can again."
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledQuotes = shuffleArray([...quotes]);

  return (
    <Slider {...settings}>
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
