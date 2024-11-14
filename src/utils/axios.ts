import axios from "axios";
// config
import { HOST_API_KEY, HOST_API } from "../config-global";
import { PATH_AUTH } from "../routes/paths";
import { handleTokenRefresh } from "../auth/utils";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["X-Client-Access"] = HOST_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    const errorMessage = 
      error.response?.status === 500 
        ? "Erro interno. Por favor, tente novamente mais tarde."
        : error.response?.data?.message || "Ocorreu um erro. Tente novamente.";

    return Promise.reject(new Error(errorMessage));
  }
);


axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        await handleTokenRefresh();
        return axios(originalRequest);
      } catch (refreshError) {
        console.log("Failed to refresh token:", refreshError);
        window.location.href = PATH_AUTH.login;
      }
    }

    if (error.response.status === 500) {
      return Promise.reject({
        status: 500,
        message: "Tivemos um problema interno. Por favor, tente novamente mais tarde.",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
