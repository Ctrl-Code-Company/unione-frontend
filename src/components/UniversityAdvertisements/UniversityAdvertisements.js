import React from "react";
import { useTranslation } from "react-i18next";

const UniversityAdvertisements = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-[1400px] my-0 mx-auto pt-[20px]" id="about">
      <h1 className="text-[#1E4B85] text-[60px] leading-[75px] text-center max-[900px]:text-[60px] max-[520px]:text-[40px]">
        {t("University")}
      </h1>
      <div className="flex justify-center gap-[30px] items-center py-[50px] px-0 flex-wrap">
        <div>
          <iframe
            className="max-[520px]:w-full max-[520px]:h-full rounded-[25px]"
            width="440"
            height="261"
            src="https://www.youtube.com/embed/sptn39x6U94"
            title="Amity Welcomes Students!"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <iframe
            className="max-[520px]:w-full max-[520px]:h-full rounded-[25px]"
            width="440"
            height="261"
            src="https://www.youtube.com/embed/MKtgH920EUw"
            title="Всё что вы хотели знать о Туринском Университете | Обзор от We.Project"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <iframe
            className="max-[520px]:w-full max-[520px]:h-full rounded-[25px]"
            width="440"
            height="261"
            src="https://www.youtube.com/embed/B_0Xvxr5BOI?si=Ei8P0NQBqftkKDD2"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default React.memo(UniversityAdvertisements);
