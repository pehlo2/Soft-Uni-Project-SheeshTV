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
const user =  await  request.get(`${endpoints.getOneUser}/${profileId}`)
 return user;
}

export const  getAllNotFollowedUser = async (searchValue) =>{

  const query = new URLSearchParams({
    search: `${searchValue}`,
});

 const users =  await  request.get(`${endpoints.getAllNotFollowedUsers}?${query}`)
  return users;




 }


export const followUser = async(userToFollowId)=>{

  const followedUser = await request.post(endpoints.followUser,{userToFollowId})
   return followedUser

}
export const unFollowUser = async(userToUnfollowId)=>{
  const followedUser = await request.post(endpoints.unFollowUser,{userToUnfollowId})
   return followedUser

}


export const updateProfile = async(userData,userId) =>{
  console.log(userData);
  const updatedUser = await request.put(`${endpoints.updateProfile}/${userId}/update`,userData)
   return updatedUser
}