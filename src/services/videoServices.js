import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'



export const upload = async (title, description, video, game) => {

    const game = await request.post(endpoints.upload, { title, description, video, game })

    return game
}