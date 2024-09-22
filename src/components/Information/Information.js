import Global from "./../../assets/svg/information_global.svg";
import Ranking from "./../../assets/svg/information_ranking.svg";
import User from "./../../assets/svg/User.svg";
import Search from "./../../assets/svg/Search.svg";
import { useTranslation } from "react-i18next";

const Information = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="max-w-[1400px] my-0 mx-auto px-[20px]">
        <h1
          className="font-bold text-[60px] text-[#1E4B85] text-center my-6 max-[800px]:text-[55px] max-[600px]:text-[40px] max-[400px]:text-[25px]"
          style={{ fontFamily: "'Comfortaa', sans-serif" }}
        >
          {t("Why they choose us")}
        </h1>
        <div className="flex justify-between gap-6 mb-[50px] max-[1000px]:flex-wrap max-[1000px]:justify-center">
          <div
            className={`w-[305px] h-[338px] border-white border-2 shadow-custom-gray rounded-[40px] p-[28px] max-[400px]:h-full max-[400px]:py-[20px] max-[400px]:px-[25px]`}
          >
            <img src={Global} alt="Global" />
            <h2 className="text-[20px] font-bold text-[#131313] pt-5 pb-4">
              {t("Information")}
            </h2>
            <p className="text-[14px] text-[#131313] text-justify">
              {t(
                "Exclusive resources and insights: Access exclusive content, webinars, and events designed to empower you in your pursuit of higher education and career success."
              )}
            </p>
          </div>
          <div
            className={`w-[305px] h-[338px] border-white border-2 shadow-custom-gray rounded-[40px] p-[28px] max-[400px]:h-full max-[400px]:py-[20px] max-[400px]:px-[25px]`}
          >
            <img src={Ranking} alt="Global" />
            <h2 className="text-[20px] font-bold text-[#131313] pt-5 pb-4">
              {t("Leader of independent ratings")}
            </h2>
            <p className="text-[14px] text-[#131313] text-justify">
              {t(
                "Vibrant online community: Join a community of students, alumni, and industry professionals to share experiences, ask questions, and receive valuable mentorship."
              )}
            </p>
          </div>
          <div
            className={`w-[305px] h-[338px] border-white border-2 shadow-custom-gray rounded-[40px] p-[28px] max-[400px]:h-full max-[400px]:py-[20px] max-[400px]:px-[25px]`}
          >
            <img src={User} alt="Global" />
            <h2 className="text-[20px] font-bold text-[#131313] pt-5 pb-4">
              {t("According to the contract exactly on time")}
            </h2>
            <p className="text-[14px] text-justify text-[#131313]">
              {t(
                "Interactive knowledge assessment tests: Assess your knowledge and skills in various academic disciplines to identify your strengths, weaknesses, and areas of interest."
              )}
            </p>
          </div>
          <div
            className={`w-[305px] h-[338px] border-white border-2 shadow-custom-gray rounded-[40px] p-[28px] max-[400px]:h-full max-[400px]:py-[20px] max-[400px]:px-[25px]`}
          >
            <img src={Search} alt="Global" />
            <h2 className="text-[20px] font-bold text-[#131313] pt-5 pb-4">
              {t("Staged payment")}
            </h2>
            <p className="text-[14px] text-justify text-[#131313]">
              {t(
                "Comprehensive university database: Explore detailed profiles of the world's most prestigious universities,  including university rankings, admission requirements, tuition fees, and program options."
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
