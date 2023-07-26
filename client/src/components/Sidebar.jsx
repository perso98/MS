import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
export default function Sidebar() {
  const isSmallScreen = useMediaQuery("(max-width:1222px)");
  const { user } = useContext(AuthContext);
  return (
    <>
      <div
        className={isSmallScreen ? "small-screen-sidebar" : "sidebar-container"}
      >
        <div className="sidebar-elements">
          <NavLink to={`/${user._id}/pokemons`}>
            <div className="sidebar-element">Pokemons</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
