

import React from "react";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";


import errorAnimation from "../assets/Animation - error.json"; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-h-screen bg-base-100 text-base-content flex flex-col justify-center items-center bg-gray-100 text-gray-800">

      <div className="w-72 md:w-96">
        <Lottie
          animationData={errorAnimation} 
          loop
          autoplay
        />
      </div>


      <Fade>
        <h1 className="text-6xl font-extrabold text-red-500 mt-6 animate-bounce">
          404
        </h1>
      </Fade>

      <p className="text-xl mt-4 text-gray-600">
        <Typewriter
          words={[
            "Oops! Page not found.",
            "You seem lost.",
            "Let's get you back home.",
          ]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={1000}
        />
      </p>

 
      <button
        data-tooltip-id="homeTooltip"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 shadow-lg"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
      <ReactTooltip
        id="homeTooltip"
        content="Click to return to the homepage!"
        place="top"
        className="rounded-lg"
      />
    </div>
  );
};

export default ErrorPage;
