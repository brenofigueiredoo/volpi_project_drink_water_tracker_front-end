import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-drink-water-tracker.onrender.com/api",
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
