import { NavLink } from "react-router-dom";

export default function Navbar(){
    return (
        
        <nav>
        <NavLink to='/'>Welcome page</NavLink>
        <NavLink to='/place'>Place</NavLink>
        </nav>
        
    )
}