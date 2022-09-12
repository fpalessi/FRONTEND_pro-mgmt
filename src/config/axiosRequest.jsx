import axios from "axios";

const axiosRequest = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default axiosRequest;
