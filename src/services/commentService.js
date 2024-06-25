import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'



export const getAllVideoComments = async (videoId) => {
   debugger
    const query = new URLSearchParams({
        where: `videoId="${videoId}"`,
    });
    console.log(query);
    const result = await request.get(`${endpoints.videoComments}?${query}`);
    console.log(result);
    return result;
};






export const createComment = async (videoId, text, userId) => {

    const newCommnet = await request.post(endpoints.createComment, {
        videoId, text, userId

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