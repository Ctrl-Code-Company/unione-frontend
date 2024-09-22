import axios from "axios";
export const instance = axios.create({
  // baseURL: "http://209.97.139.80:8000/api",
  // baseURL: "https://univway.com/api",
  // baseURL: "https://api.univway.com/",
  // baseURL: "https://api.unione.uz/",
  baseURL: "http://127.0.0.1:8000/",
  // baseURL: "http://167.71.243.28:8000/api",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});
