import { endpoints } from "../lib/endpoints"
import * as request from '../lib/request'

export const getNotifications = async (userId) => {

 
    const notifications = await request.get(`${endpoints.notifications}/${userId}`)

    return notifications;
}


export const  deleteNotifications = async (notificationId) => {

    const notifications = await request.del(`${endpoints.notifications}/${notificationId}/delete`)
    return notifications;

};
export const  markAsRead  = async (notificationId) => {

    const notifications = await request.put(`${endpoints.notifications}/${notificationId}/read`)
    return notifications;


};
