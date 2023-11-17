import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 5000,
});

export const config = () => {
  const token = localStorage.getItem("authToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
// baseURL: "https://api-drink-water-tracker.onrender.com/api",
