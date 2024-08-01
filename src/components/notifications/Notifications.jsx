

import styles from './Notifications.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


const Notifications = ({ userId,

  notifications,
  markAsReadHandler,
  deleteNotificationsReadHandler }) => {



  const notificationTypes = {
    liked: (notification) => <div className={styles['notification-message']}><span className={styles['authorName']}>{notification.authorName}</span> liked your  {<Link to={`/videos/${notification.videoId}`}>Video.</Link>}</div>,
    commented: (notification) => <div className={styles['notification-message']}><span className={styles['authorName']}>{notification.authorName}</span> commented '{notification.text}' on your {<Link to={`/videos/${notification.videoId}`}>Video.</Link>}</div>,
    followed: (notification) => <div className={styles['notification-message']}><span className={styles['authorName']}>{notification.authorName}</span> started following you.</div>
  };



  return (
    <div className={styles['notification-wrapper']} >
      <h4>Notifications</h4>
      <div className={styles['notification-container']}>
        {notifications.length === 0 && (
          <div className={styles['no-notifications']}>
            <FontAwesomeIcon icon={faBell} className={styles['bell']}></FontAwesomeIcon>
            <h4>You have no notifications</h4>
          </div>

        )}

        {notifications.map((notification) => (
          <div key={notification._id} className={`${notification.read ? styles['notification-read'] : styles['notification-unread']}`} >
            <div onClick={() => markAsReadHandler(notification._id)} className={styles['notification-info']}>
              <div>{notificationTypes[notification.type](notification)}</div>
            </div>
            <div>
              <a onClick={() => deleteNotificationsReadHandler(notification._id)}>x</a>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Notifications;
