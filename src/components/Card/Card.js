import { useTranslation } from "react-i18next";
import Filter from "./../../assets/svg/Filter.svg";
import Domestic from "./../../assets/svg/Domestic.svg";
import International from "./../../assets/svg/International.svg";
import Mock from "./../../assets/svg/Mock.svg";
import Recommendation from "./../../assets/png/recommendation.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./Card.module.css";

const Card = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="my-0 mx-auto max-w-[1400px] py-[30px] px-0 max-[600px]:py-[10px]">
          <h1
            className="text-[60px] font-bold leading-[75px] text-[#1E4B85] text-center max-[600px]:text-[60px] max-[450px]:text-[35px]"
            style={{ fontFamily: "'Comfortaa', sans-serif" }}
          >
            {t("Work Place")}
          </h1>
          <div className="flex justify-center gap-[20px] pt-[50px] max-[900px]:flex-wrap max-[1000px]:mx-[30px] max-[1000px]:gap-[30px]">
            <div className="flex justify-center gap-[10px] items-center p-[30px] rounded-[40px] max-[1000px]:p-[20px] max-[1000px]:w-full max-[670px]:flex-col border-1 max-[400px]:gap-[0px] border-white border shadow-custom-gray w-[50%] bg-[rgba(255, 255, 255, 0.3)]">
              <div>
                <h2 className="text-[37px] font-semibold max-[1100px]:text-[30px] max-[400px]:text-[22px]">
                  {t("Domestic Universities")}
                </h2>
                <h4 className="text-[35px] max-[1100px]:text-[30px] max-[500px]:text-[25px] max-[400px]:text-[17px] max-[400px]:ml-[0px]">
                  {t("Information about Domestic Universities")}
                </h4>
                <a href="/domestic">
                  <button className={styles.buttonCard}>
                    <div className="p-[10px] bg-white rounded-full shadow-button-card text-[#1E4B85] max-[450px]:p-[5px]">
                      <ArrowForwardIcon />
                    </div>
                    <p className="text-[20px] text-[#1E4B85] font-semibold max-[450px]:text-[16px]">
                      Domestic Universities
                    </p>
                  </button>
                </a>
              </div>
              <a href="/domestic">
                <img
                  src={Domestic}
                  alt="Domestic"
                  className="max-[400px]:scale-75"
                />
              </a>
            </div>
            <div className="p-[20px] rounded-[40px] max-[1000px]:w-full border-white border-2 shadow-custom-gray w-[50%]">
              <h2 className="text-[37px] font-semibold max-[1100px]:text-[30px] max-[400px]:text-[22px] max-[400px]:ml-[0px]">
                {t("International Universities")}
              </h2>
              <div className="flex justify-center gap-[10px] items-center max-[550px]:flex-wrap">
                <div>
                  <h4 className="text-[35px] max-[1100px]:text-[30px] max-[500px]:text-[25px] max-[400px]:text-[17px]">
                    {t("Information about International Universities")}
                  </h4>
                  <a href="/international">
                    <button className={styles.buttonCard}>
                      <div className="p-[10px] bg-white rounded-full shadow-button-card text-[#1E4B85]max-[450px]:p-[5px]">
                        <ArrowForwardIcon />
                      </div>
                      <p className="text-[20px] text-[#1E4B85] font-semibold max-[450px]:text-[16px]">
                        International Universities
                      </p>
                    </button>
                  </a>
                </div>
                <a href="/international">
                  <img
                    src={International}
                    alt="International"
                    className="scale-125 max-[900px]:scale-100 max-[400px]:scale-75"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-[20px] pt-[50px] max-[900px]:flex-wrap max-[1000px]:mx-[30px] max-[1000px]:gap-[30px]">
            <div className="flex justify-center gap-[10px] items-center p-[30px] rounded-[40px] max-[1000px]:p-[20px] max-[1000px]:w-full max-[670px]:flex-col border-1 max-[400px]:gap-[0px] border-white border-2 shadow-custom-gray w-[50%]">
              <div>
                <h2 className="text-[37px] font-semibold max-[1100px]:text-[30px] max-[400px]:text-[22px]">
                  {t("Smart Filter")}
                </h2>
                <h4 className="text-[35px] max-[1100px]:text-[30px] max-[500px]:text-[25px] max-[400px]:text-[17px] max-[400px]:ml-[0px]">
                  {t("Smart Filter Generating your Dream University")}
                </h4>
                <a href="/calculator">
                  <button className={styles.buttonCard}>
                    <div className="p-[10px] bg-white rounded-full shadow-button-card text-[#1E4B85] max-[450px]:p-[5px]">
                      <ArrowForwardIcon />
                    </div>
                    <p className="text-[20px] text-[#1E4B85] font-semibold max-[450px]:text-[16px]">
                      Smart FIlter
                    </p>
                  </button>
                </a>
              </div>
              <a href="/calculator">
                <img
                  src={Filter}
                  alt="Domestic"
                  className="max-[400px]:scale-75"
                />
              </a>
            </div>
            <div className="p-[20px] rounded-[40px] max-[1000px]:w-full border-white border-2 shadow-custom-gray w-[50%]">
              <h2 className="text-[37px] font-semibold max-[1100px]:text-[30px] max-[400px]:text-[22px] max-[400px]:ml-[0px]">
                {t("Mock Test")}
              </h2>
              <div className="flex justify-center gap-[10px] items-center max-[550px]:flex-wrap">
                <div>
                  <h4 className="text-[35px] max-[1100px]:text-[30px] max-[500px]:text-[25px] max-[400px]:text-[17px]">
                    {t(
                      "Mock Exam Generating with ai helps preparing your exams"
                    )}
                  </h4>
                  <a href="/mock">
                    <button className={styles.buttonCard}>
                      <div className="p-[10px] bg-white rounded-full shadow-button-card text-[#1E4B85]max-[450px]:p-[5px]">
                        <ArrowForwardIcon />
                      </div>
                      <p className="text-[20px] text-[#1E4B85] font-semibold max-[450px]:text-[16px]">
                        Mock Exam
                      </p>
                    </button>
                  </a>
                </div>
                <a href="/mock">
                  <img
                    src={Mock}
                    alt="mock"
                    className="scale-125 max-[900px]:scale-100 max-[400px]:scale-75"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.card_idp}>
            <div className="flex justify-center gap-[10px] items-center p-[30px] rounded-[40px] max-[1000px]:p-[20px] max-[1000px]:w-full max-[670px]:flex-col border-1 max-[400px]:gap-[0px] border-white border-2 shadow-custom-gray w-[50%]">
              <div>
                <h2 className="text-[35px] font-semibold max-[1100px]:text-[30px] max-[400px]:text-[22px]">
                  {t("Recommendation System")}
                </h2>
                <h4 className="text-[25px] max-[1100px]:text-[30px] max-[500px]:text-[25px] max-[450px]:text-[16px] max-[450px]:ml-[0px]">
                  {t(
                    "Univ Way offers you universities according to your wishes and requirements by ML Technology"
                  )}
                </h4>
                <a href="/recommendations">
                  <button className={styles.buttonCard}>
                    <div className="p-[10px] bg-white rounded-full shadow-button-card text-[#1E4B85] max-[450px]:p-[5px]">
                      <ArrowForwardIcon />
                    </div>
                    <p className="text-[20px] text-[#1E4B85] font-semibold max-[450px]:text-[16px]">
                      Recommendation System
                    </p>
                  </button>
                </a>
              </div>
              <a href="/calculator">
                <img
                  src={Recommendation}
                  alt="Recommendation"
                  className="scale-110 max-[400px]:scale-75"
                />
              </a>
            </div>
            <div className={styles.image_idp}>
              <h1 className={styles.coming_soon}>Coming Soon!</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
