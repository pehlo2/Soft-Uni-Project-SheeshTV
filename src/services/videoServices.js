import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'



export const upload = async (formData) => {

    const game = await request.post(endpoints.upload, formData)

    return game
}

export const getAllvideos = async()=>{

    const games = await request.get(endpoints.getAllVideos)
    return games
}