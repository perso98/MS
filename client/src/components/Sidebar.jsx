import { NavLink } from "react-router-dom";
export default function Sidebar() {
  const sidebarElements = ["Shop", "News"];
  return (
    <>
      <div className="sidebar-container">
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
