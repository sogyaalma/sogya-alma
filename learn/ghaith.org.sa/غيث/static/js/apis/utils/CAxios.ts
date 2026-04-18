import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const CAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus: (status) => status < 400,
});

CAxios.interceptors.request.use((config) => {
  const { headers } = config;

  if (cookies.get("apiKey")) {
    headers["Authorization"] = "Bearer " + cookies.get("apiKey");
  }
  return config;
});

CAxios.interceptors.response.use(null, (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      cookies.remove("apiKey");
      window.location.replace("/");
    }
    if (error.response.status === 303) {
      console.error("خطأ", "هذه الكيان موجود بالفعل");
    }
    if (error.response.status === 500) {
      console.error("خطأ", "حدث خطأ ما! يرجى التواصل مع المسؤول");
    }
  }
  return Promise.reject(error);
});

export default CAxios;
