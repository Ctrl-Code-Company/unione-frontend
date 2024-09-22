import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import { instance } from "../axios";
import BuyCoin from "./../../assets/svg/buyCoin-logo.svg";
import { useState } from "react";
import Modal from "../Login/Modal/Modal";
import Register_Mobile from "./../../assets/png/login_mobile.png";
import { Select, Space } from "antd";

const Register = () => {
  const [showNextInputs, setShowNextInputs] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [mathScore, setMathScore] = useState("");
  const [englishScore, setEnglishScore] = useState("");
  const [major, setMajor] = useState(null); // Changed to null to emphasize the need for an integer
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleNextClick = async () => {
    const result = await trigger([
      "first_name",
      "last_name",
      "email",
      "password",
      "password_confirm",
    ]);
    if (result) {
      setShowNextInputs(true);
    }
  };

  const onSubmit = (data) => {
    const { math_score, english_score, major, ...filteredData } = data;

    instance
      .post("/users/register", filteredData)
      .then((response) => {
        setIsModalOpen(true);
        setModalMessage("Register Successfully!");
        setLoginSuccess(true);
      })
      .catch((error) => {
        setIsModalOpen(true);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errorMessage = error.response.data.errors
            .map((err) => err.message)
            .join(", ");
          setModalMessage(`Register failed: ${errorMessage}`);
        } else {
          setModalMessage("An unexpected error occurred. Please try again.");
        }
        setLoginSuccess(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (loginSuccess) {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div className={styles.main_register}>
        <Modal isOpen={isModalOpen} className="z-30">
          <h2 className={styles.modalTitle}>{modalMessage}</h2>
          <button onClick={handleCloseModal} className={styles.modalButton}>
            OK
          </button>
        </Modal>
        <div className={styles.mobile_version}>
          <img src={Register_Mobile} alt="Register_Mobile" />
          <h2 className={styles.mobile_heading}>Welcome to Univ Way!</h2>
        </div>
        {showNextInputs ? (
          <div className={styles.container}>
            <img src={BuyCoin} alt="buyCoin" className={styles.logo_image} />
            <h1 className={styles.container_heading}>
              We are customizing your data!
            </h1>

            <select
              name=""
              id=""
              className="py-[2px] px-[10px] border border-white rounded-[7px]"
            >
              <option value="en">English</option>
              <option value="ru">Russian</option>
              <option value="uzb">Uzbek</option>
            </select>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form_register}
            >
              <div className={styles.name_form}>
                <div>
                  <h2>Grade</h2>
                  <input
                    type="number"
                    name="grade"
                    max={11}
                    min={5}
                    className="w-[222px]"
                    placeholder={errors.grade ? "Required" : ""}
                    // className={errors.grade ? styles.errorPlaceholder : ""}
                    // {...register("grade", { required: true })}
                    required
                  />
                </div>
                <div>
                  <h2>Phone Number</h2>
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder={errors.phone_number ? "Required" : ""}
                    required
                    className={
                      errors.phone_number ? styles.errorPlaceholder : ""
                    }
                    {...register("phone_number", { required: true })}
                  />
                </div>
              </div>
              <div className={styles.name_form}>
                <div>
                  <h2>Math Score</h2>
                  <select
                    name=""
                    id=""
                    className="w-[222px] h-[45px] border border-black rounded-[7px] px-[5px]"
                    onChange={(value) => setMathScore(value)}
                  >
                    <option value="Foundation">Foundation</option>
                    <option value="High">High</option>
                    <option value="SAT">SAT</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <h2>English Score</h2>
                  <select
                    name=""
                    id=""
                    className="w-[222px] h-[45px] border border-black rounded-[7px] px-[5px]"
                    onChange={(value) => setMathScore(value)}
                  >
                    <option value="5 - 5.5">5 - 5.5</option>
                    <option value="6 - 6.5">6 - 6.5</option>
                    <option value="7 - 7.5">7 - 7.5</option>
                    <option value="8 - 8.5">8 - 8.5</option>
                    <option value="9">9</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.name_form}>
                <div>
                  <h2>Your interested major</h2>

                  <select
                    name=""
                    id=""
                    className="w-[222px] h-[45px] border border-black rounded-[7px] px-[5px]"
                    onChange={(value) => setMathScore(value)}
                  >
                    <option value="Medicine">Medicine</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration and Management">
                      Business Administration and Management
                    </option>
                    <option value="Finance">Finance</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
                <div>
                  <h2>Hobby</h2>
                  <input
                    type="text"
                    name="hobby"
                    placeholder={errors.hobby ? "Required" : ""}
                    className={errors.hobby ? styles.errorPlaceholder : ""}
                    {...register("hobby", { required: true })}
                  />
                </div>
              </div>
              <button className={styles.finish_button} type="submit">
                Finish
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.container}>
            <img src={BuyCoin} alt="buyCoin" className={styles.logo_image} />
            <h1 className={styles.container_heading}>Welcome to Univ Way!</h1>
            <Space wrap>
              <Select
                defaultValue="English"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "eng",
                    label: "English",
                  },
                  {
                    value: "rus",
                    label: "Russian",
                  },
                  {
                    value: "uzb",
                    label: "Uzbek",
                  },
                ]}
              />
            </Space>
            <form
              className={styles.form_register}
              onSubmit={handleSubmit(handleNextClick)}
            >
              <div className={styles.name_form}>
                <div>
                  <h2 htmlFor="first_name">First Name</h2>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className={`${styles.name_form_input} ${
                      errors.first_name ? styles.errorPlaceholder : ""
                    }`}
                    placeholder={errors.first_name ? "Required" : ""}
                    {...register("first_name", { required: true })}
                  />
                </div>
                <div>
                  <h2 htmlFor="last_name">Last Name</h2>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className={`${styles.name_form_input} ${
                      errors.last_name ? styles.errorPlaceholder : ""
                    }`}
                    placeholder={errors.last_name ? "Required" : ""}
                    {...register("last_name", { required: true })}
                  />
                </div>
              </div>

              <div>
                <h2 htmlFor="email">Email Address</h2>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`${styles.email_input} ${
                    errors.email ? styles.errorPlaceholder : ""
                  }`}
                  placeholder={errors.email ? "Required" : ""}
                  {...register("email", { required: true })}
                />
              </div>

              <div className={styles.password_form}>
                <div>
                  <h2 htmlFor="password">Password</h2>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className={`${styles.password_form_input} ${
                      errors.password ? styles.errorPlaceholder : ""
                    }`}
                    placeholder={errors.password ? "Required" : ""}
                    {...register("password", { required: true })}
                  />
                </div>
                <div>
                  <h2 htmlFor="password_confirm">Confirm your password</h2>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password_confirm"
                    id="password_confirm"
                    className={`${styles.password_form_input} ${
                      errors.password_confirm ? styles.errorPlaceholder : ""
                    }`}
                    placeholder={errors.password_confirm ? "Required" : ""}
                    {...register("password_confirm", { required: true })}
                  />
                </div>
              </div>
              <div>
                <p className={styles.paragraph}>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </p>
                <div className={styles.showPassword}>
                  <input
                    type="checkbox"
                    id="show_password"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="show_password">Show Password</label>
                </div>
                <div className={styles.button}>
                  <h3>
                    Already have an account?{" "}
                    <a href="/login" className="text-[blue]">
                      Log in
                    </a>{" "}
                  </h3>
                  <button className={styles.buttonNext} type="submit">
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
