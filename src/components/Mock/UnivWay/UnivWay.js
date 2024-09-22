import React, { useEffect, useState, useContext } from "react";
import styles from "./UnivWay.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "./../../../DataContext";

const UnivWay = () => {
  const [mockTest, setMockTest] = useState([]);
  const allData = useContext(DataContext);

  useEffect(() => {
    if (allData) {
      const englishTestsToRender = allData.flatMap((data) =>
        data.title.toLowerCase() === "univway"
          ? data.tests.map((test) => (
              <Link
                to={`/mock/confirm/${test.id}`}
                className={styles.card}
                key={test.id}
              >
                <h2>{test.title}</h2>
              </Link>
            ))
          : []
      );
      setMockTest(englishTestsToRender);
    }
  }, [allData]);

  return (
    <div>
      <div className={styles.univWay}>
        <div className={styles.main_box}>{mockTest}</div>
      </div>
    </div>
  );
};

export default UnivWay;
