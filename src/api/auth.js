import { api } from "./shared/route";

const profileRoute = "users/profile";
const authRoute = "auth";

export const fetchUser = async () =>
  api.get(profileRoute).then((res) => {
    //("user profile");
    return res.data;
  });

export const login = async (formData) =>
  api
    .post(`${authRoute}/login`, formData)
    .then((res) => res.data);

export const signup = async (formData) => {
  //("sign up");
  return api
    .post(`${authRoute}/register`, formData)
    .then((res) => res.data);
};
