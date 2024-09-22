import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { instance } from "../axios";
import Modal from "./Modal/Modal";
import BuyCoin from "./../../assets/svg/buyCoin-logo.svg";
import Login_Mobile from "./../../assets/png/login_mobile.png";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageProvider";

const Login = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signInButtonColor, setSignInButtonColor] = useState("black");
  const { language, changeLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const formData = JSON.parse(storedData);
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          setValue(key, formData[key]);
        }
      }
    }
  }, [setValue]);

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (email && password) {
      setSignInButtonColor("#1E4B85");
    } else if (email && !password) {
      setSignInButtonColor("linear-gradient(to right, #1E4B85 50%, gray 50%)");
    } else if (!email && password) {
      setSignInButtonColor("linear-gradient(to right, #1E4B85 50%, gray 50%)");
    } else {
      setSignInButtonColor("gray");
    }
  }, [email, password]);

  const handleLanguageChange = useCallback(
    (event) => {
      const selectedLanguage = event.target.value;
      changeLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
    },
    [changeLanguage, i18n]
  );

  const onSubmit = async (data) => {
    try {
      const response = await instance.post("/users/login", data);
      setIsModalOpen(true);
      setModalMessage(t("Login.successMessage", "Login Successfully!"));
      setLoginSuccess(true);
      const { token } = response.data;
      localStorage.setItem("token", token);
      if (data.rememberMe) {
        localStorage.setItem(
          "formData",
          JSON.stringify({ email: data.email, password: data.password })
        );
      } else {
        localStorage.removeItem("formData");
      }
    } catch (error) {
      setIsModalOpen(true);
      setModalMessage(
        t("Login.failureMessage", "Login failed: Invalid email or password.")
      );
      setLoginSuccess(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (loginSuccess) {
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.main_login}>
      <Modal isOpen={isModalOpen}>
        <h2 className={styles.modalTitle}>{modalMessage}</h2>
        <button onClick={handleCloseModal} className={styles.modalButton}>
          OK
        </button>
      </Modal>
      <div className={styles.mobileVersion}>
        <img src={Login_Mobile} alt="Login_Mobile" />
        <h2>{t("Welcome Back!")}</h2>
      </div>
      <div className={styles.container}></div>

      <div className={styles.main}>
        <div className="max-w-[1200px] mx-auto flex justify-center items-center flex-col max-[400px]:py-[40px]">
          <img
            src={BuyCoin}
            alt="BuyCoin"
            className="w-[128px] h-[84px] max-[450px]:hidden"
          />
          <h1 className="text-[55px] text-white font-medium py-[20px] max-[600px]:text-[35px] max-[400px]:text-[22px] max-[450px]:hidden">
            {t("Login.welcomeMessage", "Welcome Back!")}
          </h1>
          <select
            name="Language"
            id=""
            value={language}
            onChange={handleLanguageChange}
            className="py-[2px] px-[10px] border border-white rounded-[7px]"
          >
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="uz">Uzbek</option>
          </select>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="flex justify-center items-center flex-col gap-[30px] pt-[20px]"
          >
            <div className="flex justify-center flex-col items-start gap-[10px]">
              <label
                htmlFor="email"
                className="text-[16px] max-[600px]:text-[14px]"
              >
                {t("Login.emailLabel", "Email Address")}
              </label>
              <input
                id="email"
                {...register("email", {
                  required: t(
                    "Login.emailRequired",
                    "Email address is required."
                  ),
                })}
                className={
                  errors.email ? styles.errorPlaceholder : styles.input
                }
                placeholder={errors.email ? errors.email.message : ""}
                type="email"
                name="email"
              />
            </div>

            <div className="flex justify-center flex-col items-start gap-[10px]">
              <label
                htmlFor="password"
                className="text-[16px] max-[600px]:text-[14px]"
              >
                {t("Login.passwordLabel", "Password")}
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: t(
                    "Login.passwordRequired",
                    "Password is required."
                  ),
                })}
                className={
                  errors.password ? styles.errorPlaceholder : styles.input
                }
                placeholder={errors.password ? errors.password.message : ""}
              />
            </div>

            <div className="flex gap-[20px] flex-wrap justify-center items-center max-[400px]:gap-[10px]">
              <a href="/register">
                <h2 className="rounded-[32px] text-[22px] font-medium py-[10px] px-[50px] max-[500px]:text-[18px] max-[500px]:px-[35px] max-[500px]:py-[5px] max-[400px]:text-[16px] border-2 border-[#1E4B85] text-[#1E4B85]">
                  {t("Register")}
                </h2>
              </a>
              <button
                type="submit"
                className="rounded-[32px] text-[22px] font-medium text-white py-[10px] px-[50px] max-[500px]:text-[18px] max-[500px]:px-[35px] max-[500px]:py-[5px] max-[400px]:text-[16px]"
                style={{ background: signInButtonColor }}
              >
                {t("Login.signIn", "Sign In")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
