import React, { createContext, useState, useEffect } from "react";
import { instance } from "./components/axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    instance
      .get("exam/category-with-test-list")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
