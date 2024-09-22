import React from "react";
import AI from "./../../assets/svg/future-ai.svg";
import Edu from "./../../assets/svg/future-edu.svg";
import Univer from "./../../assets/svg/future-univer.svg";
import Mock from "./../../assets/svg/future-mock.svg";

import FutureBackground from "./../../assets/png/future_background.png";

const FutureInfoItem = ({ src, alt, title, description }) => (
  <div className="">
    <div className="flex items-center justify-center gap-[15px]">
      <img src={src} alt={alt} loading="lazy" className="w-full h-full" />
      <h2 className="text-6xl max-[940px]:text-[40px] max-[360px]:text-[18px]">
        {title}
      </h2>
    </div>
    <p className="text-[40px] pt-[30px] pb-0 px-0 max-[940px]:text-[25px] max-[360px]:text-[17px] max-[360px]:pt-[10px]">
      {description}
    </p>
  </div>
);

const futureInfos = [
  {
    src: Univer,
    alt: "Universities",
    title: "250+",
    description: "Universities",
  },
  {
    src: Edu,
    alt: "Programmes",
    title: "1000+",
    description: "Programmes",
  },
  {
    src: Mock,
    alt: "Mock Tests",
    title: "100+",
    description: "Mock tests",
  },
  {
    src: AI,
    alt: "AI Featured",
    title: "AI",
    description: "featured",
  },
];

const Future = React.memo(() => {
  return (
    <section>
      <div
        className="mt-0 mx-auto bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${FutureBackground})`,
        }}
      >
        <div className="max-w-[1400px] my-0 mx-auto h-[525px] text-white flex justify-between flex-wrap items-center font-bold gap-2.5 px-[10px] py-0 max-[940px]:justify-center max-[940px]:p-[30px] max-[940px]:gap-[40px] max-[940px]:h-full max-[360px]:py-[30px] max-[360px]:px-0 ">
          {futureInfos.map((info, index) => (
            <FutureInfoItem key={info.alt} {...info} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Future;
