import axios from "axios";
// config
import { HOST_API_KEY, HOST_API } from "../config-global";
//import { setSession } from "../auth/utils";
//import { PATH_AUTH } from "../routes/paths";
//import { handleTokenRefresh } from "../auth/utils";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["X-Client-Access"] = HOST_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const isRefreshing = localStorage.getItem("isRefreshing");

//     if (originalRequest._retry === undefined) {
//       originalRequest._retry = false;
//     }

//     if (error.response.status === 401 && !originalRequest._retry && !isRefreshing) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await axiosInstance.post(
//           "/v1/Auth/refresh-token"
//         );
//         const { token } = refreshResponse.data;

//         if (token) {
//           setSession(token);
//           originalRequest.headers["Authorization"] = `Bearer ${token}`;
//           return axiosInstance(originalRequest);
//         } else {
//           throw new Error("Token de atualização inválido");
//         }
//       } catch (refreshError) {
//         console.error("Erro ao renovar o token", refreshError);

//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error); // Rejeita o erro para a requisição original
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 429) {
      return Promise.reject({
        status: 429,
        message: "Tente novamente mais tarde.",
      });
    }

    if (error.response.status === 500) {
      return Promise.reject({
        status: 500,
        message:
          "Tivemos um problema interno. Por favor, tente novamente mais tarde.",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
