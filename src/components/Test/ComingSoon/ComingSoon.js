import React from "react";
import styles from "./ComingSoon.module.css";

const ComingSoon = () => {
  return (
    <div className={styles.coming}>
      <img src={process.env.PUBLIC_URL + "/images/comingsoon.jpg"} alt="" />
    </div>
  );
};

export default ComingSoon;
