import './Navigation.module.css'
import { Link } from 'react-router-dom'
export default function Navigation() {

    return (<header>
        <div className="logo">
            <p>SheeshTV</p>
        </div>
        <div className="search">
            <input type="search" />
        </div>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    </header>)
}



{/* <li><a href="">Home</a></li>
<li><a href="">Signup</a></li>
<li><a href="">Discover</a></li> */}