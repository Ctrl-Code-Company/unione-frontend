import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./../../../DataContext";
import BackgroundImage1 from "./../../../assets/png/onatil-background-1.png";
import BackgroundImage2 from "./../../../assets/png/onatil-background-2.png";
import BackgroundImage3 from "./../../../assets/png/onatili-background-3.png";
import BackgroundImage4 from "./../../../assets/png/onatili-background-4.png";
import BackgroundImage5 from "./../../../assets/png/onatili-backgrdoun-5.png";
import BackgroundImage6 from "./../../../assets/png/onatili-backgrdoun-6.png";
import BackgroundImage7 from "./../../../assets/png/onatili-backgrdoun-7.png";
import BackgroundImage8 from "./../../../assets/png/onatili-backgrdoun-8.png";
import BackgroundImage9 from "./../../../assets/png/onatili-backgrdoun-9.png";
import BackgroundImage10 from "./../../../assets/png/onatili-backgrdoun-10.png";

const MotherTongue = () => {
  const [mockTest, setMockTest] = useState([]);
  const allData = useContext(DataContext);

  useEffect(() => {
    if (allData) {
      const englishTestsToRender = allData.flatMap((data) =>
        data.title.toLowerCase() === "onatili"
          ? data.tests.map((test) => (
              <Link
                to={`/mock/confirm/${test.id}`}
                className="w-[292px] h-[201px] flex px-[10px] justify-center items-center bg-cover bg-no-repeat rounded-[9px] cursor-pointer text-white relative"
                key={test.id}
                style={{
                  background: getRandomBackground(),
                  boxShadow: "0 0 10px gray",
                }}
              >
                <h2>{test.title}</h2>
              </Link>
            ))
          : []
      );
      setMockTest(englishTestsToRender);
    }
  }, [allData]);

  const images = [
    `url(${BackgroundImage1})`,
    `url(${BackgroundImage2})`,
    `url(${BackgroundImage3})`,
    `url(${BackgroundImage4})`,
    `url(${BackgroundImage5})`,
    `url(${BackgroundImage6})`,
    `url(${BackgroundImage7})`,
    `url(${BackgroundImage8})`,
    `url(${BackgroundImage9})`,
    `url(${BackgroundImage10})`,
  ];

  const getRandomBackground = () => {
    const shuffledImages = images.sort(() => 0.5 - Math.random());
    return `linear-gradient(#00000078,#00000078), ${shuffledImages[0]}`;
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-[50px] flex-wrap py-[40px] text-center">
        {mockTest}
      </div>
    </div>
  );
};

export default MotherTongue;
