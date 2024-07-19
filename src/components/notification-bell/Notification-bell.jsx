import { useContext, useEffect, useRef, useState } from "react"
import AuthContext from "../../context/authContext"
import Notifications from "../notifications/Notifications"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import styles from './Notification-bell.module.css'

const NotificationsBell = () => {
    const { userId, isAuthenticated } = useContext(AuthContext)

    const [showNotifications, setShowNotifications] = useState(false)
    const notificationRef = useRef()







    
    useEffect(() => {

        const handler = (e) => {

            if (!notificationRef.current.contains(e.target)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }

    }, [])


    return (
        <li className={styles['bell']}><FontAwesomeIcon icon={faBell} onClick={() => setShowNotifications(!showNotifications)} ref={notificationRef} />
            <div className={styles['notifications-popup']} onClick={(e) => e.stopPropagation()} >
                {showNotifications && <Notifications userId={userId} onClose={() => setShowNotifications(false)} />}
            </div>

        </li>
    )
}

export default NotificationsBell