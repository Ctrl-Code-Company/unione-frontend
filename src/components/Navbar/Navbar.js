import React, { useState, useContext, useEffect, useCallback } from "react";
import "./Navbar.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./../../LanguageProvider";
import { instance } from "../axios";
import { Space, Select } from "antd";
import NavbarLogo from "./../../assets/svg/navbar-logo.svg";
import Coin from "./../../assets/svg/coin.svg";

const Navbar = () => {
  const { language, changeLanguage } = useContext(LanguageContext); //changeLanguage
  const { t, i18n } = useTranslation(); //changeLanguage
  const [toggle, setToggle] = useState(false); //hamburger navbar
  const [stateCoin, setStateCoin] = useState({ coin: 0 }); //coin system
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); //auth user

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsUserLoggedIn(!!token);
    instance
      .get("/users/me")
      .then((res) => {
        setStateCoin({ coin: res.data.coin });
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });
  }, []); // auth user data

  const handleLanguageChange = useCallback(
    (selectedLanguage) => {
      changeLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
    },
    [changeLanguage, i18n]
  ); //change language

  // const handleLanguageChange = useCallback(
  //   (e) => {
  //     const selectedLanguage = e.target.value;
  //     changeLanguage(selectedLanguage);
  //     i18n.changeLanguage(selectedLanguage);
  //   },
  //   [changeLanguage, i18n]
  // );

  const handleToggle = useCallback(
    () => setToggle((prevToggle) => !prevToggle),
    []
  );

  return (
    <header>
      <nav className={`navbar ${toggle ? "expanded" : ""}`}>
        <div className="logo">
          <a href="/">
            <img src={NavbarLogo} alt="navbarLogo" />
          </a>
        </div>
        <ul className={`nav-list ${toggle ? "expanded" : ""}`}>
          <li>
            <a href="/">{t("Home")}</a>
          </li>
          <li>
            <a href="#about">{t("About Us")}</a>
          </li>
          <li>
            <a href="#card">{t("Workplace")}</a>
          </li>
          <li>
            <a href="/library">{t("E-library")}</a>
          </li>
          {isUserLoggedIn ? (
            <div className="user_list">
              <a href="/profile">
                <AccountCircleIcon
                  style={{ fontSize: "40px", color: " #005BAA" }}
                />
              </a>
            </div>
          ) : (
            <div className="user_list">
              <button
                onClick={() => {
                  window.location.href = "/login";
                }}
                className="sign-in-button"
              >
                Log In
              </button>
            </div>
          )}
        </ul>
        <div className="user">
          <a href="/buyCoin">
            <div className="coin">
              <p className="coin_paragraph">Coin {stateCoin.coin}</p>
              <img src={Coin} alt="coin" className="coin_img" />
            </div>
          </a>
          <div className="lang">
            <Space wrap>
              <Select
                defaultValue="lucy"
                name="Language"
                value={language}
                onChange={handleLanguageChange}
                options={[
                  {
                    value: "en",
                    label: "Eng",
                  },
                  {
                    value: "ru",
                    label: "Rus",
                  },
                  {
                    value: "uz",
                    label: "Uzb",
                  },
                ]}
              />
            </Space>
          </div>
          {isUserLoggedIn ? (
            <div className="user_info">
              <a href="/profile">
                <AccountCircleIcon
                  style={{ fontSize: "40px", color: " #005BAA" }}
                />
              </a>
            </div>
          ) : (
            <div className="max-[450px]:hidden">
              <button
                onClick={() => {
                  window.location.href = "/login";
                }}
                className="sign-in-button"
              >
                Log In
              </button>
            </div>
          )}
          <div className="toggle_icon" onClick={handleToggle}>
            {toggle ? (
              <CloseIcon style={{ fontSize: "32px", color: "#121212" }} />
            ) : (
              <MenuOpenIcon style={{ fontSize: "32px", color: "#121212" }} />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Navbar);
