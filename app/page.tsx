"use client"
import CreateSecretePhrase from "@/components/CreateSecretePhrase";
import LandingPage from "@/components/LandingPage";
import SecretRecoveryWarning from "@/components/SecretRecoveryWarning";
import { useState } from "react";

// Define a type for slide components that accept props
type SlideProps = {
  goToNextSlide: () => void;
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of slide components
  const slides = [
    (props: SlideProps) => <LandingPage {...props} />,
    (props: SlideProps) => <SecretRecoveryWarning {...props} />,
    () => <CreateSecretePhrase/>,
  ];

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center text-white bg-zinc-950">
      {/* Render the current slide */}
      <div className="text-center">
        {slides[currentSlide]({ goToNextSlide })}
      </div>

      {/* Slide indicator dots with navigation */}
      {currentSlide === 0 ? ( null ) : (
      <div className="flex gap-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)} // Navigate to selected slide
            className={`w-4 h-4 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Home;
