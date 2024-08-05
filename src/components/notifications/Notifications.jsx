

import styles from './Notifications.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


const Notifications = ({ userId,

  notifications,
  markAsReadHandler,
  deleteNotificationsReadHandler, deleteAllNotificationsReadHandler,
  markAllAsReadHandler }) => {



  const notificationTypes = {
    liked: (notification) => <div className={styles['notification-message']}><span className={styles['authorName']}><Link to={`/users/${notification.authorId}`}>{notification.authorName}</Link></span> liked your  {<Link to={`/videos/${notification.videoId}`}>Video.</Link>}</div>,
    commented: (notification) => <div className={styles['notification-message']}><span className={styles['authorName']}><Link to={`/users/${notification.authorId}`}>{notification.authorName}</Link></span> commented your {<Link to={`/videos/${notification.videoId}`}>Video.</Link>}</div>,
    followed: (notification) => <div className={styles['notification-message']}><span className={styles['authorName']}><Link to={`/users/${notification.authorId}`}>{notification.authorName}</Link></span> started following you.</div>
  };



  return (
    <div className={styles['notification-wrapper']} >
      <h4>Notifications</h4>
      {notifications.length !== 0 && <div className={styles['notification-all-actions']} >
        <p onClick={deleteAllNotificationsReadHandler}>Clear all</p>
        <p onClick={markAllAsReadHandler}>Mark all as read</p>
      </div>}

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
