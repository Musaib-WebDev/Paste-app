import { NavLink } from "react-router-dom"
const nav = () => {
  return (
<div className="flex items-center justify-center bg-[#0d0d0d] gap-20 p-4 text-amber-50">
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/pastes" >
        Pastes
      </NavLink>
    </div>

  )
}

export default nav
