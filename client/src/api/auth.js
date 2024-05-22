import axios from "axios";
// Funkcja do rejestracji użytkownika
export const register = async (registerForm, setRegisterForm, setAlert) => {
  await axios
    .post("/user/register", {
      email: registerForm.email,
      password: registerForm.password,
      name: registerForm.name,
      surname: registerForm.surname,
    })
    .then((res) => {
      // Jeśli rejestracja zakończyła się sukcesem
      if (res.data.success) {
        setAlert({
          info: res.data.message,
          severity: res.data.success,
          open: true,
        });
        // Wyczyszczenie formularza rejestracji
        setRegisterForm({
          email: "",
          password: "",
          password2: "",
          name: "",
          surname: "",
        });
      } else {
        // Wyświetlenie alertu w przypadku błędu
        setAlert({
          info: res.data.message,
          severity: res.data.success,
          open: true,
        });
      }
    });
};
// Funkcja do autoryzacji użytkownika
export const auth = async (setUser, setLoading) => {
  await axios.get("/user/auth").then((res) => {
    // Jeśli autoryzacja zakończyła się sukcesem
    if (res.data.success) {
      console.log(res.data.user);
      setUser(res.data.user);
    }
    // Ustawienie stanu ładowania na false
    setLoading(false);
  });
};
// Funkcja do logowania użytkownika
export const login = async (loginForm, setAlert, setUser, navigate) => {
  await axios
    .post("/user/login", {
      email: loginForm.email,
      password: loginForm.password,
    })
    .then((res) => {
      // Jeśli logowanie zakończyło się sukcesem
      if (res.data.success) {
        setUser(res.data.user);
        navigate("/");
      } else {
        // Wyświetlenie alertu w przypadku błędu
        setAlert({
          info: res.data.message,
          severity: res.data.success,
          open: true,
        });
      }
    });
};
// Funkcja do wylogowania użytkownika
export const logout = async (setUser, navigate) => {
  await axios.post("/user/logout").then((res) => {
    // Ustawienie użytkownika na null i nawigacja do strony logowania
    setUser(null);
    navigate("/auth");
  });
};
