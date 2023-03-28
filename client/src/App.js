import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
import "./App.css";
import Rightbar from "./components/Rightbar";
import User from "./pages/User";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="app-container">
          <Sidebar />
          <div className="main-container">
            <div className="main-elements ">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<User />} />
              </Routes>
            </div>
          </div>
          <Rightbar />
        </div>
      </Router>
    </>
  );
}

export default App;
