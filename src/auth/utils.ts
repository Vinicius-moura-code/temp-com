// routes
import { PATH_AUTH } from "../routes/paths";
import axiosInstance from "../utils/axios";


// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  const currentTime = Date.now();

  const bufferTime = 5 * 60 * 1000;
  const timeLeft = Math.max(0, exp * 1000 - currentTime - bufferTime);

  setTimeout(async () => {
    try {
      const keepConnected = JSON.parse(
        localStorage.getItem("KeepConnected") || "false"
      );
      if (keepConnected) {
        await handleTokenRefresh();
      } else {
        sessionExpired();
      }
    } catch (error) {
      console.error(error);
      sessionExpired();
    }
  }, timeLeft);
};

const sessionExpired = () => {
  localStorage.removeItem("accessToken");
  setSession(null);
  localStorage.setItem("sessionExpired", "true");
  window.location.href = PATH_AUTH.login;
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};


export const handleTokenRefresh = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new Error("No access Token available");

  try {
    const response = await axiosInstance.post("/v1/auth/refresh-token");

    const { token: newAccessToken } = response.data.response;

    if (newAccessToken) {
      setSession(newAccessToken);
    } else {
      sessionExpired();
      throw new Error("Invalid tokens received from server");
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    sessionExpired();
  }
};

