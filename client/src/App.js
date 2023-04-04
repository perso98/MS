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
import ProtectedRoute from "./protected-routes/AuthRoute";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <div className="app-container">
        {user ? <Sidebar /> : null}
        <div className="main-container">
          <div className="main-elements ">
            <Routes>
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User />} />
              </Route>
              <Route path="auth" element={<AuthPage />} />
            </Routes>
          </div>
        </div>
        {user ? <Rightbar /> : null}
      </div>
    </>
  );
}

export default App;
