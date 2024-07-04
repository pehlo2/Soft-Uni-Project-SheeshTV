import { endpoints } from "../lib/endpoints"
import * as request from '../lib/request'
export const login = async (formData) => {

    const game = await request.post(endpoints.login, formData)

    return game
}

export const register = async (userData) => {

    const game = await request.post(endpoints.register, userData)

    return game
}
export const logout = async() => {
  await  request.get(endpoints.logout)
    
}

export const  getUser = async (profileId) =>{
 let user =  await  request.get(`${endpoints.getOneUser}/${profileId}`)
 return user;
}

export const  getAllNotFollowedUser = async () =>{
  let users =  await  request.get(endpoints.getAllNotFollowedUsers)
  return users;
 }