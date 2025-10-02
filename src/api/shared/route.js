import axios from "axios";

export const baseURL = `https://basement-studio-server.onrender.com`;

export const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem(
    "accessToken"
  );
  if (token)
    req.headers.Authorization = `Bearer ${token}`;
  return req;
});
