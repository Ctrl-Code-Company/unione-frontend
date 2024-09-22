import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Chat.module.css";
import { instance } from "./../axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import UserAvatar from "./../../assets/png/useravatar.png";
import Robot from "./../../assets/png/robot.png";

const Chat = () => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    const timestamp = new Date();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, sender: "user", timestamp },
    ]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await instance.post("/aibot/chat/", {
        message: userMessage,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: response.data.response,
          sender: "backend",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const formatTimestamp = useCallback((date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  return (
    <>
      <div className={styles.main}>
        <button className={styles.qwe} onClick={() => setShow(!show)}>
          {show ? <CloseIcon size={50} /> : <img src={Robot} alt="Robot" />}
        </button>

        {show && (
          <div className={styles.inputs}>
            <div className={styles.chat}>
              <h1 style={{ fontSize: "20px" }}>AI Assistant</h1>
              <p style={{ color: "#8ED76B", fontSize: "12px" }}>Online</p>
            </div>
            <div className={styles.messagesContainer}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.messageContainer} ${
                    message.sender === "user"
                      ? styles.userMessageContainer
                      : styles.backendMessageContainer
                  }`}
                >
                  <div
                    className={`${styles.message} ${
                      message.sender === "user"
                        ? styles.userMessage
                        : styles.backendResponse
                    }`}
                  >
                    {message.text}
                    <p className={styles.timestamp}>{` ${formatTimestamp(
                      message.timestamp
                    )}`}</p>
                  </div>
                  <img
                    src={
                      message.sender === "user" ? `${UserAvatar}` : `${Robot}`
                    }
                    alt="Avatar"
                    className={styles.avatar}
                  />
                </div>
              ))}
              {isTyping && (
                <div
                  className={`${styles.messageContainer} ${styles.typingIndicator}`}
                >
                  <div className={styles.message}>Typing...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputArea}>
              <input
                className={styles.input}
                type="text"
                placeholder="Write a reply..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              <button className={styles.send} onClick={handleSubmit}>
                <ArrowUpwardIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
