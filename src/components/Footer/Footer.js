import styles from "./Footer.module.css";
import FooterLogo from "./../../assets/svg/footer-logo.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.container}>
          <img
            src={FooterLogo}
            alt="footerLogo"
            className={styles.footerLogo}
          />
          <div className={styles.card2}>
            <p className={styles.footer_paragraph}>
              {t(
                "Source of Information: Data obtained from external sources, including but not limited to the QS Ranking website."
              )}{" "}
              <br />
              <br />
              {t(
                "Utilization Policy: We have exercised diligence in utilizing this information responsibly and in accordance with fair use policies and applicable laws."
              )}
              <br />
              <br />
              {t(
                "Contact: If you have any questions or concerns about the information presented on our website, please feel free to contact"
              )}
              us. <br />
              <br />
              {t(
                "Feedback: Your feedback is important to us as we strive to maintain transparency and integrity in all aspects of our operations."
              )}
            </p>
          </div>
          <div className={styles.card2}>
            <div className={styles.contact}>
              <a href="https://www.instagram.com/ctrlcode_company/">
                <InstagramIcon style={{ fontSize: "40px" }} />
              </a>
              <a href="https://www.linkedin.com/company/ctrl-code-company/mycompany/verification/">
                <LinkedInIcon style={{ fontSize: "40px" }} />
              </a>
              <a href="https://t.me/univway">
                <TelegramIcon style={{ fontSize: "40px" }} />
              </a>
            </div>
            <div className={styles.big_icon}>
              <div className={styles.icon}>
                <EmailIcon style={{ fontSize: "30px" }} />
                <p>company.support@ctrlcode.uz</p>
              </div>
              <div className={styles.icon}>
                <LocationOnIcon style={{ fontSize: "30px" }} />
                <p>Tashkent, Uzbekistan</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.version}>
          <h3
            style={{
              color: "white",
              fontWeight: "lighter",
              padding: "0 0 20px 0",
            }}
          >
            {t("This website was developed by ctrlcode.uz")}
          </h3>
          <h3 style={{ color: "white", fontWeight: "lighter" }}>
            © 2023 Demo version 2.5.2
          </h3>
        </div>
        <hr style={{ background: "#FFFFFF" }} />
        <p className={styles.bottom}>All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;
