import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'



export const upload = async (formData) => {

    const game = await request.post(endpoints.upload, formData)

    return game
}

export const getAllvideos = async () => {

    const games = await request.get(endpoints.getAllVideos)
    console.log(games);
    return games
}

export const getOneVideo = async (videoId) => {

    const games = await request.get(`${endpoints.geOneVideo}/${videoId}`)
    return games
}

export const getUserVideos = async () => {


    const games = await request.get(endpoints.geUserVideos)
    return games;
}

export const likeVideo = async (videoId ,userId) =>{

   const likedVideo = await request.post(`${endpoints.geOneVideo}/${videoId}/like`,{userId})
 

   return likedVideo
} 

export const dislikeVideo = async (videoId ,userId) =>{

    const dislikedVideo = await request.post(`${endpoints.geOneVideo}/${videoId}/dislike`,{userId})
  
    return dislikedVideo
 } 