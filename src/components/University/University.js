import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Pagination, Input } from "antd";
import styles from "./University.module.css";
import { useTranslation } from "react-i18next";
import { instance } from "./../axios";
import Loading from "../Loading/Loading";
import SearchIcon from "@mui/icons-material/Search";

const fetchUniversities = async (page, pageSize, searchQuery) => {
  try {
    let url = `/university/list/?location_type=International&page=${page}&page_size=${pageSize}`;
    if (searchQuery && searchQuery.trim() !== "") {
      url += `&search=${searchQuery}`;
    }
    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch universities");
  }
};

const UniversityCard = React.memo(({ item }) => (
  <div className={styles.card} key={item.id}>
    <div className="relative">
      <div className="flex flex-col items-start py-[30px] px-[20px] w-full h-full">
        <img
          src={item.logo}
          alt="University Logo"
          className="w-[90px] h-[90px]"
        />
        <div className="h-[90px]">
          <h3 className="pt-[10px] text-[17px] leading-4">{item.title}</h3>
          <h3 className="text-[18px] text-[#848484] font-light text-left">
            {item.location}
          </h3>
        </div>
      </div>
      <div className="relative inline-block w-full rounded-b-xl">
        <img
          src={item.wallpaper}
          alt="UniversityImage"
          className="w-full rounded-b-xl h-[200px]"
        />
      </div>
      <div className={`${styles.back} ${styles.face}`}>
        <div className="flex flex-col items-start justify-center gap-[12px]">
          <p className="text-[18px] max-[600px]:text-[14px] text-[#0A487A]">
            <strong>{item.title}</strong>
          </p>
          <p className="text-[18px] max-[600px]:text-[14px]">
            <strong>Ranking:</strong> {item.in_the_world}
          </p>
          <p className="text-[18px] max-[600px]:text-[14px]">
            <strong>Location:</strong> {item.location}
          </p>
          <p className="text-[18px] max-[600px]:text-[14px]">
            <strong>Tuition & Fees:</strong> {item.fee}
          </p>
          <p className="text-[18px] max-[600px]:text-[14px]">
            <strong>Scholarship:</strong>{" "}
            {item.scholarship_count === 0
              ? "Not available"
              : `${item.scholarship_count}+`}
          </p>
          <p className="text-[18px] max-[600px]:text-[14px]">
            <strong>IELTS:</strong>{" "}
            {item.ielts === 0 ? "Not required" : `${item.ielts}+`}
          </p>
          <p className="text-[18px] max-[600px]:text-[14px]">
            <strong>SAT:</strong>{" "}
            {item.sat === 0 ? "Not required" : `${item.sat}+`}
          </p>
          <p className="text-[18px] max-[600px]:text-[14px]">
            <strong>GPA:</strong>{" "}
            {item.gpa === 0 ? "Not required" : `${item.gpa}+`}
          </p>
          <p className="text-[18px] max-[600px]:text-[14px]">
            <strong>Acceptance rate:</strong> {`${item.acceptance_rate}%`}
          </p>
        </div>
      </div>
    </div>
  </div>
));

const University = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const numEachPage = 12;
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useQuery(
    ["universities", currentPage, debouncedInputValue],
    () => fetchUniversities(currentPage, numEachPage, debouncedInputValue),
    {
      keepPreviousData: true,
    }
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
      console.log(inputValue);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error loading data: {error.message}</div>;

  return (
    <div>
      <div className={styles.backgrounduniversity}>
        <h1 className="text-[60px] text-white font-semibold text-center max-[600px]:text-[40px] max-[450px]:text-[25px]">
          {t("International Universities")}
        </h1>
        <div>
          <h1 className="text-[35px] font-normal text-center text-[#E7E9EB] max-[660px]:text-[30px] max-[450px]:text-[20px]">
            <a href="/">Home</a> /{" "}
            <a href="#">{t("International Universities")}</a>
          </h1>
        </div>
      </div>
      <h1 className="text-[40px] text-[#1E4B85] font-semibold text-center pt-[40px] max-[600px]:text-[40px] max-[450px]:text-[25px]">
        {t("Find your University")}
      </h1>
      <div className="flex justify-center">
        <Input
          size="large"
          prefix={<SearchIcon />}
          className="w-[545px] rounded-[60px] border-2 border-[black] my-[15px] max-[600px]:w-[417px] max-[600px]:mx-[5px]"
          onChange={handleInputChange}
        />
      </div>
      <h2 className="text-[25px] text-[#1E4B85] font-semibold text-center pt-[20px] max-[600px]:text-[20px] max-[600px]:pt-[10px] max-[450px]:text-[14px] px-[10px]">
        {t("IF YOU NEED MORE INFORMATION CLICK ON THE CARD")}
      </h2>
      <div className="max-w-[1400px] my-0 mx-auto pt-[50px] px-0 pb-[50px] flex flex-wrap justify-center gap-[50px] max-[600px]:gap-[20px]">
        {data?.results?.length > 0 ? (
          data.results.map((item) => (
            <UniversityCard key={item.id} item={item} />
          ))
        ) : (
          <div>No data available.</div>
        )}
      </div>
      <Pagination
        className="flex justify-center items-center pt-[10px] pb-[50px] px-0"
        current={currentPage}
        onChange={handleChangePage}
        total={data?.count || 0}
        pageSize={numEachPage}
        showSizeChanger={false}
      />
    </div>
  );
};

export default University;
