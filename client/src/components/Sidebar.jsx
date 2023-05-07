import { NavLink } from "react-router-dom";
import { useMediaQuery, useScrollTrigger } from "@material-ui/core";
export default function Sidebar() {
  const isSmallScreen = useMediaQuery("(max-width:1222px)");
  const sidebarElements = ["Shop", "News"];
  return (
    <>
      <div
        className={isSmallScreen ? "small-screen-sidebar" : "sidebar-container"}
      >
        <div className="sidebar-elements">
          {sidebarElements.map((val) => (
            <NavLink key={val} to={`/${val}`.toLowerCase()}>
              <div className="sidebar-element">{val}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
