import { useContext, useEffect, useRef, useState } from "react"
import AuthContext from "../../context/authContext"
import Notifications from "../notifications/Notifications"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import * as notificationService from '../../services/notificationsService'
import styles from './Notification-bell.module.css'
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

const NotificationsBell = () => {
    const { userId, } = useContext(AuthContext)
    const [showNotifications, setShowNotifications] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0);
    const notificationRef = useRef()



    const [notifications, setNotifications] = useState([]);


    useEffect(() => {


        notificationService.getNotifications(userId).then((notifications) => {
            const unreadCount = notifications.filter(notification => !notification.read).length;
            setUnreadCount(unreadCount);
            setNotifications(notifications)
        })
        
        socket.emit('register', userId);
        socket.on('notification', (data) => {
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
            setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
        });

        return () => {
            socket.off('notification');
        };
    }, [userId]);



    const deleteNotificationsReadHandler = async (notificationId) => {
        notificationService.deleteNotifications(notificationId)

        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification._id !== notificationId)
        );

        const newUnreadCount = notifications.filter(notification => notification._id !== notificationId && !notification.read).length;
        setUnreadCount(newUnreadCount);
    };


    const markAsReadHandler = async (notificationId) => {
        notificationService.markAsRead(notificationId)

        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification._id === notificationId ? { ...notification, read: true } : notification
            )
        );

        const newUnreadCount = notifications.filter(notification => notification._id !== notificationId && !notification.read).length;
        setUnreadCount(newUnreadCount);

    };




    useEffect(() => {

        const handler = (e) => {

            if (!notificationRef.current?.contains(e.target)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }

    }, [])


    return (

        <li className={styles['bell']} icon={faBell} onClick={() => setShowNotifications(!showNotifications)}>
            <FontAwesomeIcon icon={faBell} onClick={() => setShowNotifications(!showNotifications)} ref={notificationRef} />
            {unreadCount > 0 && (<span onClick={() => setShowNotifications(!showNotifications)} className={styles['unread-count']}  >{unreadCount}</span>)}
            <div className={styles['notifications-popup']} onClick={(e) => e.stopPropagation()} >
                {showNotifications && <Notifications
                    userId={userId}
                    onClose={() => setShowNotifications(false)}
                    notifications={notifications}
                    markAsReadHandler={markAsReadHandler}
                    deleteNotificationsReadHandler={deleteNotificationsReadHandler}

                />}
            </div>
        </li>


    )
}

export default NotificationsBell