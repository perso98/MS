import Navbar from "./components/Navbar";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
import "./App.css";
import Rightbar from "./components/Rightbar";
import User from "./pages/User";
import AuthPage from "./pages/AuthPage";
import { AuthContext } from "./providers/AuthProvider";
import AuthRoute from "./protected-routes/AuthRoute";
import { useEffect } from "react";
function App() {
  const { user, checkAuth, loading } = useContext(AuthContext);

  return (
    <>
      {!loading ? (
        <>
          <Navbar />
          <div className="app-container">
            {user ? <Sidebar /> : null}
            <div className="main-container">
              <div className="main-elements ">
                <Routes>
                  <Route element={<AuthRoute user={user} />}>
                    <Route path="/" element={<Main />} />
                    {console.log(user)}
                    <Route path="/profile" element={<User />} />
                  </Route>
                  <Route path="/auth" element={<AuthPage />} />
                </Routes>
              </div>
            </div>
            {user ? <Rightbar /> : null}
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
