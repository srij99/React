import { NavLink, Link } from "react-router-dom";


export function LoginNavbar(){
    return (
        
        <nav>
        
        <div className="logo"><Link >ShoeShop</Link></div>
        <div><NavLink to='/login'>Login</NavLink>
        <NavLink to='/signup'>Sign-up</NavLink></div>
        </nav>
        
    )
}

export function HomeNavbar(){
    return (
        
        <nav>
        <div className="logo"><Link>ShoeShop</Link></div>
        <div><NavLink to='/cart'>Cart</NavLink>
        <NavLink to='/login'>Logout</NavLink></div>
        
        </nav>
        
    )
}
export function CartNavbar(){
    return (
        
        <nav>
        <div className="logo"><Link>ShoeShop</Link></div>
        <div><NavLink to='/home'>Home</NavLink>
        <NavLink to='/login'>Logout</NavLink></div>
        </nav>
        
    )
}