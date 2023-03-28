import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
import "./App.css";
import Rightbar from "./components/Rightbar";
import User from "./pages/User";
import AuthPage from "./pages/AuthPage";
function App() {
  const user = false;
  return (
    <>
      <Router>
        <Navbar />
        <div className="app-container">
          {user ? <Sidebar /> : null}
          <div className="main-container">
            <div className="main-elements ">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User />} />
                <Route path="auth" element={<AuthPage />} />
              </Routes>
            </div>
          </div>
          {user ? <Rightbar /> : null}
        </div>
      </Router>
    </>
  );
}

export default App;
