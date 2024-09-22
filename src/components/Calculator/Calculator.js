import { useEffect, useState } from "react";
import { Select, Button, Pagination } from "antd";
import { instance } from "../axios";
import { useTranslation } from "react-i18next";
import Loading from "../Loading/Loading";
import IELTS from "./../../assets/svg/IELTS.svg";
import Math from "./../../assets/png/Math.png";
import Major from "./../../assets/png/Major.png";
import Location from "./../../assets/png/Location.png";
import BackgroundUniver from "./../../assets/png/calculator.png";

const Calculator = () => {
  const [majorData, setMajorData] = useState([]);
  const [ieltsScore, setIeltsScore] = useState("");
  const [mathScore, setMathScore] = useState("");
  const [major, setMajor] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [location, setLocation] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    instance
      .get("/university/majors/")
      .then((res) => {
        setMajorData(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching majors", error);
      });
  }, []);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const satScoreToSend =
        mathScore === "Foundation" ? 600 : mathScore === "High" ? 1200 : 1201;
      const ieltsScoreToSend =
        ieltsScore === "6-6.5"
          ? 6.5
          : ieltsScore === "5-5.5"
          ? 5.5
          : ieltsScore === "7-7.5"
          ? 7.5
          : ieltsScore === "8-8.5"
          ? 8.5
          : ieltsScore === "9"
          ? 9
          : 0;
      const queryParams = `/university/list/?majors=${major}&max_ielts=${ieltsScoreToSend}&max_sat=${satScoreToSend}&page_size=${12}&page=${page}&location_type=${location}`;

      const response = await instance.get(queryParams);
      setData(response.data.results);
      setTotalRecords(response.data.count);
      setShowResults(true);
    } catch (error) {
      console.error("Error on fetching university list", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!ieltsScore || !mathScore || !major || !location) {
      alert("Please fill in all the fields before generating results.");
      return;
    }
    setCurrentPage(1);
    fetchData(1);
  };

  const handleSearch = (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(() => {
      if (value) {
        instance.get(`/university/majors/?search=${value}`).then((res) => {
          setMajorData(res.data.results);
          console.log(res.data.results);
        });
      }
    }, 1000);

    setSearchTimeout(timeout);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  return (
    <>
      <div
        className="bg-center bg-cover bg-no-repeat h-[240px] mt-[80px] flex justify-center items-center flex-col gap-[5px] max-[450px]:h-[180px]"
        style={{
          backgroundImage: `linear-gradient(rgba(6, 48, 83, 0.7), rgba(6, 48, 83, 0.7)), url(${BackgroundUniver})`,
        }}
      >
        <h1 className="text-[80px] text-white font-semibold text-center max-[600px]:text-[40px] max-[450px]:text-[25px]">
          {t("Smart Filter")}
        </h1>
        <div>
          <h1 className="text-[35px] font-normal text-center text-[#E7E9EB] max-[660px]:text-[30px] max-[450px]:text-[20px]">
            <a href="/">Home</a> / <a href="#">Smart Filter</a>
          </h1>
        </div>
      </div>
      <div className="max-w-[1400px] my-0 mx-auto">
        <h1 className="text-center font-bold text-[#1E4B85] text-[60px] py-[70px] max-[768px]:text-[45px] max-[550px]:text-[35px] max-[450px]:text-[25px] max-[450px]:py-[40px]">
          {t("Welcome to Smart Filter!")}
        </h1>
        <div className="flex justify-center gap-[30px] items-center flex-wrap mb-[70px] px-[10px] py-0">
          <div className="p-[20px] h-[411.62px] w-[319.2px] rounded-[20px] border-2 border-solid border-white shadow-custom-gray bg-white">
            <div className="flex justify-center items-center w-[220px] h-[226px] my-0 mx-auto">
              <img src={IELTS} alt="IELTS" />
            </div>
            <h2 className="font-bold text-[20px] text-center p-[7px] border-2 border-[#1D487F] rounded-[10px] text-[#1D487F]">
              {t("IELTS SCORE")}
            </h2>
            <Select
              defaultValue="Score"
              className="w-full mt-[40px]"
              onChange={(value) => setIeltsScore(value)}
              options={[
                {
                  options: [
                    {
                      label: "5-5.5",
                      value: "5-5.5",
                    },
                    {
                      label: "6-6.5",
                      value: "6-6.5",
                    },
                    {
                      label: "7-7.5",
                      value: "7-7.5",
                    },
                    {
                      label: "8-8.5",
                      value: "8-8.5",
                    },
                    {
                      label: "9",
                      value: "9",
                    },
                    {
                      label: "No",
                      value: "No",
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="p-[20px] h-[411.62px] w-[319.2px] rounded-[20px] border-2 border-solid border-white bg-white shadow-custom-gray">
            <div className="flex justify-center items-center w-[220px] h-[226px] my-0 mx-auto">
              <img src={Math} alt="Math" className="rounded-full scale-75" />
            </div>
            <h2 className="font-bold text-[20px] text-center p-[7px] border-2 border-[#1D487F] rounded-[10px] text-[#1D487F]">
              {t("MATH SCORE")}
            </h2>
            <Select
              defaultValue="Score"
              className="w-full mt-[40px]"
              onChange={(value) => setMathScore(value)}
              options={[
                {
                  options: [
                    {
                      label: "Foundation",
                      value: "Foundation",
                    },
                    {
                      label: "High",
                      value: "High",
                    },
                    {
                      label: "SAT",
                      value: "SAT",
                    },
                    {
                      label: "No",
                      value: "No",
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="p-[20px] h-[411.62px] w-[319.2px] rounded-[20px] border-2 border-solid border-white shadow-custom-gray bg-white">
            <div className="flex justify-center items-center w-[220px] h-[226px] my-0 mx-auto">
              <img src={Major} alt="Major" className="rounded-full scale-75" />
            </div>
            <h2 className="font-bold text-[20px] text-center p-[7px] border-2 border-[#1D487F] rounded-[10px] text-[#1D487F]">
              {t("MAJORS")}
            </h2>
            <Select
              showSearch
              placeholder="Select a major"
              className="w-full mt-[40px]"
              onChange={(value) => setMajor(value)}
              onSearch={handleSearch}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={majorData.map((major) => ({
                label: major.title,
                value: major.id,
              }))}
            />
          </div>
          <div className="p-[20px] h-[411.62px] w-[319.2px] rounded-[20px] border-2 border-solid border-white bg-white shadow-custom-gray">
            <div className="flex justify-center items-center w-[220px] h-[226px] my-0 mx-auto">
              <img
                src={Location}
                alt="Location"
                className="rounded-full scale-75"
              />
            </div>
            <h2 className="font-bold text-[20px] text-center p-[7px] border-2 border-[#1D487F] rounded-[10px] text-[#1D487F]">
              {t("LOCATION")}
            </h2>
            <Select
              defaultValue="Score"
              className="w-full mt-[40px]"
              onChange={(value) => setLocation(value)}
              options={[
                {
                  options: [
                    {
                      label: "International",
                      value: "International",
                    },
                    {
                      label: "Domestic",
                      value: "Domestic",
                    },
                    {
                      label: "Both",
                      value: "",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="primary"
            className="text-[25px] text-[#1E4B85] w-[250px] h-[50px] rounded-[10px] bg-white shadow-button-card font-semibold"
            onClick={handleGenerate}
          >
            {t("Generate")}
          </Button>
        </div>
        {loading && <Loading />}
        {!loading && showResults && (
          <div
            className="max-w-[1400px] my-0 mx-auto flex justify-center mb-[25px] flex-wrap pt-[50px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {data.map((item) => (
              <div
                className="w-[300px] border-2 border-solid border-[#c8d1ea] items-center flex justify-center flex-col p-[20px] my-[15px] mx-[20px] rounded-xl"
                key={item.id}
                style={{ boxShadow: "0 0 10px #c8d1ea" }}
              >
                <div className="flex justify-center items-center gap-[10px]">
                  <img
                    className="m-[15px] h-[60px] w-[60px]"
                    src={item.logo}
                    alt="University Logo"
                  />
                  <h3 className="text-[#1E4B85]">{item.title}</h3>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <p>
                    <strong>Ranking: </strong> {item.in_the_world}
                  </p>
                  <p>
                    <strong>Location: </strong> {item.location}
                  </p>
                  <p>
                    <strong>Tuition & Fees: </strong> {item.fee}
                  </p>
                  <p>
                    <strong>Scholarship: </strong>
                    {item.scholarship_count === 0
                      ? item.scholarship_count
                      : item.scholarship_count + "+"}
                  </p>
                  <p>
                    <strong>IELTS: </strong>{" "}
                    {item.ielts === 0 ? item.ielts : item.ielts + "+"}
                  </p>
                  <p>
                    <strong>SAT: </strong>{" "}
                    {item.sat === 0 ? (
                      <span>Not required</span>
                    ) : (
                      item.sat + "+"
                    )}
                  </p>
                  <p>
                    <strong>GPA: </strong>{" "}
                    {item.gpa === 0 ? item.gpa : item.gpa + "+"}
                  </p>
                  <p>
                    <strong>University Link: </strong>
                    <a href={item.website} className="text-[blue]">
                      Official website
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        className="flex justify-center items-center pt-[10px] pb-[50px] px-0"
        current={currentPage}
        onChange={handleChangePage}
        total={totalRecords}
        pageSize={12}
        showSizeChanger={false}
      />
    </>
  );
};

export default Calculator;
