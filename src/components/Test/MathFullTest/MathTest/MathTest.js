import React, { useEffect, useState } from "react";
import styles from "./MathTest.module.css";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../../axios";

const MathTest = () => {
  const [testData, setTestData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    instance
      .get(`/exam/detail/${id}`)
      .then((res) => {
        const modifiedData = { ...res.data };
        const backendTime = res.data.time.split(":");
        const hours = parseInt(backendTime[0], 10);
        const minutes = parseInt(backendTime[1], 10);

        modifiedData.time =
          hours > 0
            ? `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
                minutes > 1 ? "s" : ""
              }`
            : `${minutes} minute${minutes > 1 ? "s" : ""}`;

        setTestData(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching mock tests:", error);
      });
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.main_box} key={testData.id}>
        <div key={testData.id}>
          <h1>{testData.title}</h1>
          <h3>Test Information</h3>
          <ul>
            <li>This test includes the {testData.id} sections.</li>
            <li>It takes about {testData.time} times to complete</li>
          </ul>
          <p>Please confirm if you would like to continue.</p>
          <div className={styles.btn}>
            <button>
              <Link to={`/mock/confirm/${testData.id}/test`}>Confirm</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathTest;
