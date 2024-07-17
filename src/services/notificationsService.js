import { endpoints } from "../lib/endpoints"
import * as request from '../lib/request'

export const getNotifications = async (userId) => {

    console.log(`${endpoints.notifications}/${userId}`);
    const notifications = await request.get(`${endpoints.notifications}/${userId}`)

    return notifications;
}


export const markAsRead = async (notificationId) => {

    const notifications = await request.del(`${endpoints.notifications}/${notificationId}/read`)
    return notifications;


};
