import React, { useEffect, useState } from "react";
import styles from "./MathFullTest.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import { useParams } from "react-router-dom";
import { instance } from "./../../axios";
import { Radio } from "antd";
import MathJaxComponent from "../../MathJax/MathJax";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Oltin from "./../../../assets/png/oltin.png";
import Kumush from "./../../../assets/png/kumush.png";
import Bronza from "./../../../assets/png/bronza.png";
import Congratulations from "./../../../assets/png/congratulations.png";
import Fail from "./../../../assets/png/fail.png";

const MathFullTest = () => {
  const [item, setItem] = useState(null);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [show, setShow] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const { id } = useParams();
  const [error, setError] = useState([]);

  useEffect(() => {
    let timerId = null;
    if (running) {
      timerId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerId);
            setShowSecondModal(true);
            setRunning(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [running, minutes, seconds]);

  useEffect(() => {
    instance
      .get(`/exam/detail/${id}/full`)
      .then((res) => {
        setItem(res.data);
        const duration = res.data.time.split(":");
        setMinutes(parseInt(duration[0]) * 60 + parseInt(duration[1]));
        setSeconds(parseInt(duration[2]));
      })
      .catch((error) => {
        // console.error("Failed to fetch exam details:", error);
        setError(error);
        setErrorModal(true);
      });
  }, [id]);

  const handleStartClick = () => {
    setShow(true);
    setRunning(true);
  };

  const handleFinishClick = () => {
    setRunning(false);
    setShowFinishModal(true);
  };

  const handleConfirmFinish = () => {
    setShowFinishModal(false);
    setShowSecondModal(true);
    const calculatedScore = Object.values(userAnswers).reduce(
      (total, current) => total + (current.is_correct ? 1 : 0),
      0
    );
    setScore(calculatedScore);

    // Noto'g'ri javoblar sonini hisoblash
    const wrongAnswersCount = item?.quizzes.length - calculatedScore;

    const points = calculatedScore;

    try {
      const response = instance.post("/exam/result", {
        correct: calculatedScore,
        wrong: wrongAnswersCount,
        point: points,
        test: id,
      });
      console.log("Test result submitted successfully:", calculatedScore);
    } catch (error) {
      console.error("Failed to submit test results:", error);
    }

    setShowSecondModal(true);
  };

  const handleContinueClick = () => {
    setShowFinishModal(false);
    setRunning(true);
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
    setErrorModal(false);
    window.location.href = "/mock";
  };

  const shouldTimerBeRed = () =>
    minutes < 5 || (minutes === 5 && seconds === 0);
  const timerStyle = shouldTimerBeRed() ? { color: "red" } : {};

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleAnswerChange = (questionIndex, answerId, is_correct) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: { answerId, is_correct },
    }));
  };
  const formatTime = (totalMinutes, seconds) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showFinishModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>
              Are you sure you want to exit the test? Any unsaved data in this
              section will be lost. Confirm to proceed or continue the test
            </p>
            <div className={styles.actions}>
              <button className={styles.btn} onClick={handleConfirmFinish}>
                Ok
              </button>
              <button className={styles.btn} onClick={handleContinueClick}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {errorModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent2}>
            <div>
              {error.response.data.errors.map((err) => {
                return <h3 className={styles.percent}>{err.message}</h3>;
              })}
            </div>
            <button
              style={{
                padding: "5px 40px",
                background: "#4A5D8C",
                color: "white",
                fontWeight: "bold",
              }}
              className={styles.exit}
              onClick={handleCloseSecondModal}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showSecondModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent2}>
            <h1 className={styles.percent}>Your test Result</h1>
            <img
              src={
                (score / (item?.quizzes.length || 1)) * 100 < 30
                  ? `${Fail}`
                  : (score / (item?.quizzes.length || 1)) * 100 >= 95
                  ? `${Congratulations}`
                  : (score / (item?.quizzes.length || 1)) * 100 > 80
                  ? `${Oltin}`
                  : (score / (item?.quizzes.length || 1)) * 100 >= 50
                  ? `${Kumush}`
                  : `${Bronza}`
              }
              style={{ width: "15%", height: "auto" }}
              alt="Achievement"
            />
            <h2
              style={{
                color:
                  (score / (item?.quizzes.length || 1)) * 100 < 30
                    ? "red"
                    : "#FFBD3D",
              }}
            >
              {(score / (item?.quizzes.length || 1)) * 100 < 30
                ? "Oops!"
                : "Congratulations!"}
            </h2>

            <h2 className={styles.percent}>
              {Math.round((score / (item?.quizzes.length || 1)) * 100)}% out of
              100%
            </h2>
            <h2 className={styles.percent}>
              You've completed the Test. Your score is {score} out of{" "}
              {item?.quizzes.length || "N/A"}
            </h2>
            <p>
              Your results indicate there's room for improvement. Remember,
              every challenge is a learning opportunity. Let's focus on growth
              and strategies to enhance your understanding. You've got this!
            </p>
            <button
              style={{
                padding: "5px 40px",
                background: "#4A5D8C",
                color: "white",
                fontWeight: "bold",
              }}
              className={styles.exit}
              onClick={handleCloseSecondModal}
            >
              Exit
            </button>
          </div>
        </div>
      )}

      <div className={styles.main_box}>
        {item && (
          <>
            <div className={styles.questions}>
              <div className={styles.container}>
                <div className={styles.container2}>
                  <h2 className={styles.time}>
                    <TimerIcon size={35} className={styles.iconTimer} />
                    Time: {formatTime(minutes, seconds)}
                  </h2>
                  {!show ? (
                    <div>
                      <button
                        className={styles.startBtn}
                        onClick={handleStartClick}
                      >
                        Start Test
                      </button>
                      <button
                        className={styles.startBtn}
                        onClick={handleFinishClick}
                      >
                        Finish Test
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className={styles.startBtn}
                        onClick={handleStartClick}
                      >
                        Start Test
                      </button>
                      <button
                        className={styles.startBtn}
                        onClick={handleFinishClick}
                      >
                        Finish Test
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.testTitleContainer}>
              <div className={styles.testTitle}>
                <h4>{item.title}</h4>
                <h4 style={timerStyle} className={styles.test}>
                  {item?.quizzes.length || "N/A"} questions
                </h4>
              </div>
            </div>

            {show &&
              item.quizzes.map((quiz, quizIndex) => (
                <div key={quizIndex} className={styles.quiz}>
                  <h2
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "end",
                      color: "black",
                    }}
                  >
                    <div
                      className={styles.mathQuestion}
                      onCopy={(event) => {
                        event.preventDefault();
                      }}
                    >
                      {/* {`${quizIndex + 1}.`} */}
                      <div style={{ display: "flex", gap: "10px" }}>
                        <p>{quizIndex + 1}. </p>
                        {/* {item.category === 14 ? (
                          <MathJaxComponent
                            content={quiz.question}
                            isQuestion={true}
                          />
                          ) : (
                            <div
                            dangerouslySetInnerHTML={{ __html: quiz.question }}
                          />
                        )} */}
                        {/* {quiz.question} */}
                        {/* <div dangerouslySetInnerHTML>{quiz.question}</div> */}
                        <MathJaxComponent
                          style={{ fontFamily: "sans-serif" }}
                          content={quiz.question}
                          isQuestion={true}
                        />
                        {/* {removePTags(quiz.question)} */}
                        {/* <MathJaxComponent content={`${quiz.question}`} /> */}
                        {/* <InlineMath math={stripHtml(quiz.question)} /> */}
                      </div>
                      {/* <MathJaxComponent content={"c = \\pm\\sqrt{a^2 + b^2}"} /> */}
                    </div>
                  </h2>
                  {quiz.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className={styles.answer}>
                      <Radio.Button
                        id={`answer_${quizIndex}_${answerIndex}`}
                        name={`question_${quizIndex}`}
                        value={answer.answer}
                        className={`${styles.variant} ${
                          userAnswers[quizIndex]?.answerId === answer.id &&
                          styles.selectedRadioButton
                        }`}
                        onChange={(e) =>
                          handleAnswerChange(
                            quizIndex,
                            answer.id,
                            answer.is_correct
                          )
                        }
                      >
                        {/* <Radio value={answer.id}> */}
                        {/* <MathJaxComponent content={answer.answer} /> */}
                        {item.category === 14 ? (
                          <InlineMath math={stripHtml(answer.answer)} />
                        ) : item.category === 15 ? (
                          // Add your condition for category 15 here
                          <InlineMath math={stripHtml(answer.answer)} />
                        ) : (
                          <MathJaxComponent content={answer.answer} />
                        )}

                        {/* </Radio> */}

                        {/* {answer.answer} */}
                        {/* <MathJaxComponent content={`${answer.answer}`} /> */}
                        {/* <MathJaxComponent content={answer.answer} /> */}
                        {/* <InlineMath math={stripHtml(answer.answer)} /> */}
                      </Radio.Button>
                    </div>
                  ))}
                </div>
              ))}
            {!show ? (
              <div
                style={{
                  maxWidth: "1400px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "40px",
                }}
              ></div>
            ) : (
              <div
                style={{
                  maxWidth: "1400px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "50px",
                  gap: "40px",
                }}
              >
                <button className={styles.startBtn} onClick={handleFinishClick}>
                  Finish Test
                </button>
              </div>
            )}
            <div className={styles.line}></div>
          </>
        )}
      </div>
      <button className={styles.scrollToTopBtn} onClick={handleScrollToTop}>
        <ArrowUpwardIcon />
      </button>
    </>
  );
};

export default MathFullTest;
