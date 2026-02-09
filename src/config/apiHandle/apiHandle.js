import axios from "axios";
import { save_tokens_constant } from "../../utils/asyncStatus";
import { session_expired } from "../../utils/constants";

export const exit_session = () => {
  localStorage.setItem(session_expired, true);
  window.location.reload();
  localStorage.removeItem("auth");
  sessionStorage.clear()
};

// export const baseURL = `https://api.h2research.org/api/`;
export const baseURL = `${import.meta.env.VITE_API_BASE_URL}/`;
// export const baseURL = `https://stagging-server786.com/mol-hyd-backend/public/api/`;


export const apiHandle = axios.create({
  baseURL: `${baseURL}`,
});

axios.defaults.timeout = 15000;

apiHandle.interceptors.request.use(async (req) => {
  const authTokens = localStorage.getItem(save_tokens_constant.AUTH)
    ? localStorage.getItem(save_tokens_constant.AUTH)
    : null;
  if (authTokens) {
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  return req;
});