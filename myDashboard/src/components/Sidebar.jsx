import { NavLink } from "react-router-dom";
const Sidebar = ()=>{
  return(
    <nav className="w-[200px] h-screen bg-white py-6 px-8">
      <h1>logo</h1>
      <ul className="pt-8">
        <li>          
          <NavLink to="/" className={({ isActive }) =>`inline-block py-2 ${isActive ? "font-black" : ""}`}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/todo" className={({ isActive }) =>`inline-block py-2 ${isActive ? "font-black" : ""}`}>
            TODO
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default Sidebar;