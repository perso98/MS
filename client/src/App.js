import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
import "./App.css";
import User from "./pages/User";
import AuthPage from "./pages/AuthPage";
import { AuthContext } from "./providers/AuthProvider";
import AuthRoute from "./protected-routes/AuthRoute";
import SearchPage from "./pages/SearchPage";
import Post from "./pages/Post";
import CircularProgress from "@mui/material/CircularProgress";
import { useMediaQuery } from "@material-ui/core";
function App() {
  const { user, loading } = useContext(AuthContext);
  const isSmallScreen = useMediaQuery("(max-width:1222px)");
  const [openSidebar, setOpenSidebar] = useState(true);
  useEffect(() => {
    if (isSmallScreen) {
      setOpenSidebar(false);
    }
  }, [isSmallScreen]);
  return (
    <>
      {!loading ? (
        <>
          <Navbar setOpen={setOpenSidebar} open={openSidebar} />
          {user && openSidebar ? <Sidebar /> : null}
          <div className="main-container">
            <div className="main-elements ">
              <Routes>
                <Route element={<AuthRoute user={user} />}>
                  <Route path="/" element={<Main />} />
                  <Route path="/user/:id" element={<User />} />
                  <Route path="/search/:search" element={<SearchPage />} />
                  <Route path="/post/:id" element={<Post />} />
                </Route>
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <div className="loading-div">
          <CircularProgress style={{ color: "white" }} />
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;
