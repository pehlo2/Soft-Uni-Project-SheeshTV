import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import * as notificationService from '../../services/notificationsService'

const socket = io('http://localhost:5000');

const Notifications = ({ userId }) => {

    const [notifications, setNotifications] = useState([]);

    
    useEffect(() => {


       notificationService.getNotifications(userId).then(setNotifications)
         

        socket.emit('register', userId);

        socket.on('notification', (data) => {
            setNotifications((prevNotifications) => [...prevNotifications, data]);
        });

        return () => {
          socket.off('notification');
        };
    }, [userId]);



    const markAsReadHandler = async (notificationId) => {
        notificationService.markAsRead(notificationId)

        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification._id !== notificationId)
          );
      };

console.log(notifications);


  
    return (
        <div>
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification._id}>
          <p> {notification.authorName}  {notification.type}  '{notification.text}' on your video  {notification.video}</p>
          <button onClick={() => markAsReadHandler(notification._id)}>Mark as read</button>
        </div>
      ))}
    </div>
    );
};

export default Notifications;
