import React, { useContext, useEffect, useState } from "react";
import English from "./English/English";
import Biology from "./Biology/Biology";
import MotherTongue from "./MotherTongue/MotherTongue";
import History from "./History/History";
import WorldHistory from "./WorldHistory/WorldHistory";
import Literature from "./Literature/Literature";
import Russian from "./Russian/Russian";
import Loading from "./../Loading/Loading";
import { DataContext } from "./../../DataContext";
import IUT from "./IUT/IUT";
import styles from "./Mock.module.css";
import { Select, Space } from "antd";
import AUT from "./AUT/AUT";
import Mathematics from "./Math/Math";
import West from "./West/West";
import UnivWay from "./UnivWay/UnivWay";
import DTM from "./DTM/Dtm";

const Mock = () => {
  const data = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("english");

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  const renderSelectedSubject = () => {
    switch (selectedSubject) {
      case "univway":
        return <UnivWay />;
      case "english":
        return <English />;
      case "dtm":
        return <DTM />;
      case "math":
        return <Mathematics />;
      case "iut":
        return <IUT />;
      case "aut":
        return <AUT />;
      case "west":
        return <West />;
      case "rustiliuz":
        return <Russian />;
      case "biologyuz":
        return <Biology />;
      case "adabiyotuz":
        return <Literature />;
      case "onatili":
        return <MotherTongue />;
      case "historyuz":
        return <History />;
      case "historyworld":
        return <WorldHistory />;
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.backgrounduniversity}>
            <h1 className="text-[60px] text-white font-semibold text-center max-[600px]:text-[40px] max-[450px]:text-[25px]">
              Mock Exams
            </h1>
            <div>
              <h1 className="text-[35px] font-normal text-center text-[#E7E9EB] max-[660px]:text-[30px] max-[450px]:text-[20px]">
                <a href="/">Home</a> / <a href="/mock">Mock Exams</a>
              </h1>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto text-[25px] font-bold">
            <div className="flex items-center gap-[10px] max-[1000px]:justify-center max-[1200px]:mx-[20px]">
              <h1 className="text-[40px] font-thin py-[20px] max-[400px]:text-[25px]">
                Sort by:{" "}
              </h1>
              <Space wrap>
                <Select
                  defaultValue="English"
                  style={{
                    width: 150,
                  }}
                  onChange={(value) => setSelectedSubject(value)}
                  options={[
                    {
                      label: <span>Exclusive Test</span>,
                      title: "Exclusive Test",
                      options: [
                        {
                          value: "univway",
                          label: "Univway",
                        },
                      ],
                    },
                    {
                      label: <span>University Test</span>,
                      title: "University Admission Test",
                      options: [
                        {
                          value: "west",
                          label: "West",
                        },
                        {
                          value: "iut",
                          label: "IUT",
                        },
                        {
                          value: "aut",
                          label: "AUT",
                        },
                        {
                          value: "dtm",
                          label: "DTM",
                        },
                      ],
                    },
                    {
                      label: <span>Mock Test</span>,
                      title: "Mock Test",
                      options: [
                        {
                          value: "english",
                          label: "English",
                        },
                        {
                          value: "math",
                          label: "Math",
                        },
                        {
                          value: "rustiliuz",
                          label: "Russian",
                        },
                        {
                          value: "biologyuz",
                          label: "Biology",
                        },
                        {
                          value: "adabiyotuz",
                          label: "Literature",
                        },
                        {
                          value: "onatili",
                          label: "Mother Tongue",
                        },
                        {
                          value: "historyuz",
                          label: "History",
                        },
                        {
                          value: "historyworld",
                          label: "World History",
                        },
                      ],
                    },
                  ]}
                />
              </Space>
            </div>
            {renderSelectedSubject()}
          </div>
        </>
      )}
    </>
  );
};

export default Mock;
