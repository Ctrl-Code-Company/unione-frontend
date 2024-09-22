import React, { useState, useEffect } from "react";
import Background from "./../../assets/png/e-library.png";
import MobileBackground from "./../../assets/png/mobile-e-library.png";

const Library = () => {
  const [currentBackground, setCurrentBackground] = useState(Background);

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth <= 500) {
        setCurrentBackground(MobileBackground);
      } else {
        setCurrentBackground(Background);
      }
    };

    // Set the initial background based on the initial window size
    updateBackground();

    // Add event listener for window resize
    window.addEventListener("resize", updateBackground);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateBackground);
    };
  }, []);

  return (
    <div className="w-full mt-[80px] flex justify-center items-center">
      {/* <h1 className="text-[100px]">Coming Soon!</h1> */}
      <img src={currentBackground} alt="Background" />
    </div>
  );
};

export default Library;
