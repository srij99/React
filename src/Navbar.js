import { NavLink } from "react-router-dom";


export function LoginNavbar(){
    return (
        
        <nav>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/signup'>Sign-up</NavLink>
        </nav>
        
    )
}

export function HomeNavbar(){
    return (
        
        <nav>
        <NavLink to='/cart'>Cart</NavLink>
        <NavLink to='/login'>Logout</NavLink>
        
        </nav>
        
    )
}
export function CartNavbar(){
    return (
        
        <nav>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/login'>Logout</NavLink>
        </nav>
        
    )
}