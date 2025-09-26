import axios from "axios";

export const baseURL = `http://localhost:3001`;

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
