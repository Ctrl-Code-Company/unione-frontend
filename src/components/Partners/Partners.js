import { Carousel } from "antd";
import styles from "./Partners.module.css";
import { useTranslation } from "react-i18next";
import AmityLogo from "./../../assets/png/amity2.png";
import CtrlCode from "./../../assets/png/ctrlcode2.png";
import Qs from "./../../assets/png/qs.png";
import AscHub from "./../../assets/png/aschub2.png";

const images = [`${AmityLogo}`, `${CtrlCode}`, `${Qs}`, `${AscHub}`];

const Partners = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1
        className="text-[#1E4B85] py-[40px] px-0 text-center text-[60px] max-[600px]:text-[35px] max-[400px]:text-[25px]"
        style={{ fontFamily: "'Comfortaa', sans-serif" }}
      >
        {t("Our partners")}
      </h1>
      <div className="lg:hidden">
        {" "}
        <Carousel
          autoplay
          slidesToShow={2}
          autoplaySpeed={2000}
          className={styles.slider_logo}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.image_container}>
              <img
                src={image}
                alt={`Logo ${index + 1}`}
                className={styles.carousel_image}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="hidden lg:block">
        {" "}
        {/* Apply styles only for screens larger than lg (min-width: 1024px) */}
        <Carousel
          autoplay
          slidesToShow={3}
          autoplaySpeed={2000}
          className={styles.slider_logo}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.image_container}>
              <img
                src={image}
                alt={`Logo ${index + 1}`}
                className={styles.carousel_image}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Partners;
