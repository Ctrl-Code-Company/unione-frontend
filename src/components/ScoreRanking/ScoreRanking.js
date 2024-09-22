import React, { useState, useEffect } from "react";
import { Radio, Table } from "antd";
import { instance } from "../axios";
import { useTranslation } from "react-i18next";

const ScoreRanking = () => {
  const [placement, setPlacement] = useState("topLeft");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [placement]);

  const placementChange = (e) => {
    setPlacement(e.target.value);
  };
  const { t } = useTranslation();

  const fetchData = () => {
    instance
      .get(`/exam/top-users?subject=${placement}`)
      .then((res) => {
        console.log(res.data);
        const modifiedData = res.data.map((item, index) => ({
          ...item,
          ranking: index + 1,
          key: index + 1,
        }));
        setData(modifiedData);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });
  };

  const columns = [
    {
      title: "Ranking",
      dataIndex: "ranking",
    },
    {
      title: "Name",
      dataIndex: "user",
    },
    {
      title: "Points",
      dataIndex: "total_points",
    },
  ];

  return (
    <div className="max-w-[1400px] my-0 mx-auto pt-[50px] px-[10px] pb-0">
      <h1
        className="text-[60px] text-center pb-[30px] px-0 pt-0 font-bold sm:text-6xl max-[600px]:text-45px max-[400px]:text-[25px] max-[400px]:pb-[10px] text-[#1E4B85]"
        style={{ fontFamily: "'Comfortaa', sans-serif" }}
      >
        {t("Web Site Ranking")}
      </h1>
      <div className="flex flex-wrap items-center justify-between pb-[30px] px-0 pt-0 gap-2 max-[1000px]:mx-[40px] max-[700px]:justify-center">
        <h2
          className="font-normal text-3xl sm:text-4xl"
          style={{ fontFamily: "'League Spartan', sans-serif" }}
        >
          {t("Ranks")}
        </h2>
        <div className="flex justify-center items-center">
          <Radio.Group value={placement} onChange={placementChange}>
            <Radio.Button value="english" className="bg-blue-100">
              English
            </Radio.Button>
            <Radio.Button value="math" className="bg-blue-100">
              Math
            </Radio.Button>
            <Radio.Button value="history" className="bg-blue-100">
              History
            </Radio.Button>
            <Radio.Button value="physics" className="bg-blue-100">
              Physics
            </Radio.Button>
            <Radio.Button value="motherTongue" className="bg-blue-100">
              MotherTongue
            </Radio.Button>
            <Radio.Button value="dtm" className="bg-blue-100">
              DTM
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <hr />
      <h1 className="text-center py-[30px] px-0 text-[30px] font-bold sm:text-[40px] max-[400px]:text-[25px]">
        {t("English Test Leaderboard")}
      </h1>
      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-blue-100" : "bg-white"
        }
      />
    </div>
  );
};

export default ScoreRanking;
