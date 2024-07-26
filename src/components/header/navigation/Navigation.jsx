import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'
import DarkMode from '../../dark-mode/DarkMode'
import { useContext, useState } from 'react'
import AuthContext from '../../../context/authContext'
import SearchBar from '../../search-bar/Search-bar'



import NotificationsBell from '../../notification-bell/Notification-bell'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import ProfileDropMenu from '../../profile-drop-menu/Profile-drop-menu'


export default function Navigation({
    toggleTheme
}) {

    const [showDropMenu, setShowDropMenu] = useState(false)
    const { userId, isAuthenticated, avatar } = useContext(AuthContext)

    console.log(showDropMenu);
    return (
        <header className={styles["main-header"]} >
            <div className={styles["logo"]}>
                <p>SheeshTV</p>
            </div>
            <div className={styles["search"]}>
                < SearchBar />
            </div>

            <nav>
                <ul>
                    < DarkMode toggleTheme={toggleTheme} />

                    {isAuthenticated && (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/discover">Discover</Link></li>
                            <NotificationsBell />
                            <li className={styles['drop-menu-profile']} >
                                <img src={avatar} alt={avatar} onClick={() => setShowDropMenu(!showDropMenu)} />
                                {showDropMenu && <ProfileDropMenu />}
                            </li>

                        </>
                    )}
                    {!isAuthenticated && (
                        <>
                            <li><Link to="/login" className={styles['login-button', 'buttons']} ><FontAwesomeIcon icon={faRightFromBracket} /><span>Login</span></Link></li>
                            <li><Link to="/register" className={styles['register-button', 'buttons']}><FontAwesomeIcon icon={faUserPlus} /> <span>Sign Up</span></Link></li>
                        </>
                    )}

                </ul>
            </nav>

        </header>


    )
}




{/* <li><a href="">Home</a></li>
<li><a href="">Signup</a></li>
<li><a href="">Discover</a></li> */}