import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import * as notificationService from '../../services/notificationsService'
import styles from './Notifications.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const socket = io('http://localhost:5000');

const Notifications = ({ userId }) => {

  const [notifications, setNotifications] = useState([]);


  useEffect(() => {


    notificationService.getNotifications(userId).then(setNotifications)


    socket.emit('register', userId);

    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
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
  };


  const markAsReadHandler = async (notificationId) => {
    notificationService.markAsRead(notificationId)

    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };



  const notificationTypes = {
    liked: (notification) => <><span className={styles['authorName']}>{notification.author}</span> liked your  {<Link to={`/videos/${notification.videoId}`}>Video</Link>}.</>,
    commented: (notification) => <> <span className={styles['authorName']}>{notification.author}</span> commented '{notification.text}' on your {<Link to={`/videos/${notification.videoId}`}>Video</Link>}.</>,
    followed: (notification) => <><span className={styles['authorName']}>{notification.author}</span> started following you.</>
  };



  return (
    <div className={styles['notification-wrapper']} >
      <h2>Notifications</h2>
      <div className={styles['notification-container']}>
        {notifications.length === 0 && (
          <div className={styles['no-notifications']}>
            <FontAwesomeIcon icon={faBell} className={styles['bell']}></FontAwesomeIcon>
            <h3>You have no notifications</h3>
          </div>

        )}

        {notifications.map((notification) => (
          <div key={notification._id} className={`${notification.read ? styles['notification-read'] : styles['notification-unread']}`} onClick={() => markAsReadHandler(notification._id)}>
            <p >{notificationTypes[notification.type](notification)}</p>
            <a onClick={() => deleteNotificationsReadHandler(notification._id)}>x</a>
          </div>

        ))}
      </div>

    </div>
  );
};

export default Notifications;
