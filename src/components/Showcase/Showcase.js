// import ShowcaseChildren from "./../../assets/png/showcase_children.png";
// import ShowcaseGirl from "./../../assets/png/showcase_girl.png";
// import ShowcaseRobot from "./../../assets/png/showcase_robot.png";
// import { useTranslation } from "react-i18next";
// import styles from "./Showcase.module.css";

// const Showcase = () => {
//   const { t } = useTranslation();

//   return (
//     <>
//       <div className={styles.mainPage}>
//         <div className="max-w-[1400px] my-0 mx-auto h-[100vh] flex items-center pt-[90px] pb-[20px] max-[1000px]:h-full max-[1100px]:pt-[110px] max-[1000px]:pb-[0px] max-[1100px]:mx-[40px]">
//           <div className="flex justify-center items-center gap-[20px] max-[1000px]:flex-wrap max-[850px]:gap-[30px]">
//             <div
//               className="w-[50%] bg-[#C9DAF3] rounded-[35px] px-[50px] h-full flex flex-col justify-center items-center max-[1000px]:w-full border border-[#0D3B66]"
//               style={{ boxShadow: "0 0 10px rgba(0,0,0,0.6)" }}
//             >
//               <h1 className="text-[38px] font-bold text-center max-[400px]:text-[25px] py-[60px]">
//                 {t("Welcome to Univ Way")}
//               </h1>
//               <img src={ShowcaseChildren} alt="ShowcaseChildren" />
//             </div>
//             <div className="w-[50%] flex flex-col gap-[22px] max-[1000px]:flex-row max-[1000px]:w-full max-[900px]:flex-col max-[900px]:gap-[30px]">
//               <div
//                 className="bg-[#327AE4] p-[20px] h-[300px] flex justify-center items-center rounded-[35px] max-[1000px]:w-[50%] max-[900px]:w-full max-[900px]:h-full max-[400px]:flex-col border border-[#0D3B66]"
//                 style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)" }}
//               >
//                 <p className="text-[23px] text-white max-[1100px]:text-[20px] max-[600px]:text-[16px] max-[400px]:text-[14px]">
//                   {t(
//                     "Single electronic assistant. You will be helped to choose a higher education university and the first step for your profession in the future"
//                   )}
//                 </p>
//                 <img
//                   src={ShowcaseRobot}
//                   alt="ShowcaseRobot"
//                   className="w-[208px] h-[208px] max-[500px]:w-[164px] max-[500px]:h-[164px]"
//                 />
//               </div>
//               <div
//                 className="bg-[#8078A3] px-[20px] pt-[20px] h-[300px] flex justify-center items-center rounded-[35px] max-[1000px]:w-[50%] max-[900px]:h-full max-[900px]:w-full max-[400px]:flex-col border border-[#0D3B66]"
//                 style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)" }}
//               >
//                 <p className="text-[23px] text-white max-[1100px]:text-[20px] max-[600px]:text-[16px] max-[400px]:text-[14px]">
//                   {t("Find your Dream University with us 300+ University,")}
//                   {t(" 1000+ Majors Smart Filter,")}
//                   <br />
//                   {t("Mock Exam AI Asistant")}
//                 </p>
//                 <img
//                   src={ShowcaseGirl}
//                   alt="ShowcaseGirl"
//                   className="w-[208px] h-[208px] max-[500px]:w-[164px] max-[500px]:h-[164px]"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Showcase;

import React from "react";
import styles from "./Showcase.module.css";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsightsIcon from "@mui/icons-material/Insights";

const Showcase = () => {
  const { t } = useTranslation();
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000, // values from 0 to 3000, with step 50ms
  //   });
  // }, []);

  return (
    // <section className={styles.showcase}>
    //   <div className={styles.container} data-aos="fade-down">
    //     <div className={styles.co_container}>
    //       <div className={styles.text}>
    //         <h1>Welcome to UNI WAY</h1>
    //         <h2 className={styles.description}>Find Your Dream University by</h2>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className={styles.showcase}>
      <div className={styles.container} data-aos="fade-down">
        <div className={styles.title}>
          <h1>{t("Welcome to Univ Way")}</h1>
        </div>
        <div className={styles.information}>
          <div className={styles.dream}>
            <h2>{t("Find Your Dream University by")}</h2>
          </div>
          <div className={styles.info_table}>
            <div className={styles.map}>
              <h3>{t("Location")}</h3>
              <LocationOnIcon />
            </div>
            <div className={styles.map}>
              <h3>{t("Major")}</h3>
              <SchoolIcon />
            </div>
            <div className={styles.map}>
              <h3>{t("Academic Score")}</h3>
              <InsightsIcon />
            </div>
            <div className={styles.map}>
              <h3>{t("Acceptance rate")}</h3>
              <BarChartIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Showcase); // Wrap Showcase with React.memo for performance optimization
