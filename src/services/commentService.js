import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'


export const videoComments = async () => {
    const comments = await request.get(endpoints.videoComments)
    return comments

}

export const create = async (videoId, username, text) => {

    const newCommnet = await request.post(endpoints.createComment, {
        videoId, username, text

    })
    return newCommnet;
}