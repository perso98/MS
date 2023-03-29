import axios from "axios";
import url from "./index";
axios.defaults.withCredentials = true;
export const register = async (registerForm) => {
  await axios
    .post(`${url}/user/register`, {
      email: registerForm.email,
      password: registerForm.password,
    })
    .then((res) => console.log(res.data));
};
export const auth = async (setUser) => {
  await axios.get(`/user/auth`).then((res) => {
    console.log(res.data);
    if (res.data.success) setUser(res.data.user);
  });
};
export const login = async (loginForm, setUser) => {
  await axios
    .post(`${url}/user/login`, {
      email: loginForm.email,
      password: loginForm.password,
    })
    .then((res) => {
      setUser(res.data);
    });
};
export const logout = async (setUser) => {
  await axios.post(`${url}/user/logout`).then((res) => setUser(null));
};
