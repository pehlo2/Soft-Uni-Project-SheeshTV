import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'



export const getAllVideoComments = async (videoId) => {
 
    const query = new URLSearchParams({
        where: `videoId="${videoId}"`,
    });
   
    const result = await request.get(`${endpoints.videoComments}?${query}`);
   
    return result;
};






export const createComment = async (videoId, text, userId,avatar) => {

    const newCommnet = await request.post(endpoints.createComment, {
        videoId, text, userId,avatar

    })
    return newCommnet;
}

export const deleteComment = async (commentId) => {
    await request.del(`${endpoints.videoComments}/${commentId}`)
    

}




export const editComment = async (commentId, text) => {

    const newCommnet = await request.put(`${endpoints.videoComments}/${commentId}`,{text})
    return newCommnet;
}