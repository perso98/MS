import axios from "axios";
axios.defaults.withCredentials = true;
export const register = async (registerForm) => {
  await axios
    .post("/user/register", {
      email: registerForm.email,
      password: registerForm.password,
    })
    .then((res) => console.log(res.data));
};
export const auth = async (setUser) => {
  await axios.get("/user/auth").then((res) => {
    if (res.data.success) {
      setUser(res.data.user);
    }
  });
};
export const login = async (loginForm, setUser) => {
  await axios
    .post("/user/login", {
      email: loginForm.email,
      password: loginForm.password,
    })
    .then((res) => {
      setUser(res.data);
    });
};
export const logout = async (setUser) => {
  await axios.post("/user/logout").then((res) => setUser(null));
};
