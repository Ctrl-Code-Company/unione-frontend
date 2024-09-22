import React, { useEffect, useState, useContext } from "react";
import styles from "./IUT.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "./../../../DataContext";

const IUT = () => {
  const [mockTest, setMockTest] = useState([]);
  const allData = useContext(DataContext);

  useEffect(() => {
    if (allData) {
      const englishTestsToRender = allData.flatMap((data) =>
        data.title.toLowerCase() === "iut"
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
      <div className={styles.iut}>
        <div className={styles.main_box}>{mockTest}</div>
      </div>
    </div>
  );
};

export default IUT;
