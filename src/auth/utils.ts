// routes
import { PATH_AUTH } from "../routes/paths";
// utils
import axios from "../utils/axios";

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
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(async () => {
    try {
      const keepConnected = localStorage.getItem("KeepConnected");
      if (JSON.parse(keepConnected!)) {
        await handleTokenRefresh();
      } else {
        sessionExpired();
        localStorage.removeItem("KeepConnected");
      }
    } catch (error) {
      console.error(error);
      sessionExpired();
    }
  }, timeLeft);
};

const sessionExpired = () => {
  localStorage.removeItem("accessToken");
  setSession(null, null);
  localStorage.setItem("sessionExpired", "true");
  window.location.href = PATH_AUTH.login;
};
// ----------------------------------------------------------------------

export const setSession = (
  accessToken: string | null,
  refreshToken: string | null = null
) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    delete axios.defaults.headers.common.Authorization;
  }
};

export const handleTokenRefresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const token = localStorage.getItem("accessToken");

  if (!token) throw new Error("No access Token available");
  if (!refreshToken) throw new Error("No refresh token available");

  const tokenDecode = jwtDecode(token!);

  const response = await axios.post("/v1/auth/refresh-token", {
    email: tokenDecode?.email,
    refreshToken,
  });

  const { token: newOken, refreshToken: newRefreshToken } = response.data;
  setSession(newOken, newRefreshToken);
};
