import './style.css'
import {NavLink} from 'react-router-dom'

export default function Navbar() {

  return (
    <div className="navbar-container">
       <NavLink to="/"><h1>Kebabook</h1></NavLink>
    <div className="navbar-elements">
      <NavLink to="/profile">
      <div className="profile-container">Y</div>
        </NavLink>
        </div>
      </div>
  )
}
