import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'
import DarkMode from '../../dark-mode/DarkMode'


export default function Navigation({
    toggleTheme
}) {

    return (<header className={styles["main-header"]}>
        <div className={styles["logo"]}>
            <p>SheeshTV</p>
        </div>
        <div className={styles["search"]}>
            <input type={styles["search"]} />
        </div>
        <nav>

            <ul>
            < DarkMode toggleTheme={toggleTheme} />
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/upload">Upload</Link></li>
            </ul>
        </nav>
    </header>)
}



{/* <li><a href="">Home</a></li>
<li><a href="">Signup</a></li>
<li><a href="">Discover</a></li> */}