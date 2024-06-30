export const endpoints = {
    // users
    getUser:'/users/profile',
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    getAllUsers: "/users/",
    getOneUser: "/users",

    // videos
    upload: "/data/videos/upload",
    getAllVideos: "/data/videos/",
    geOneVideo: "/data/videos",
    geUserVideos: "/data/videos/user-videos",
    delete:'/data/videos/',
    edit:'/data/videos/',
   


    //comments

    createComment: "/comments",
    videoComments: "/comments",
    getOneComment: "/comments/:commentId",
    deleteComment: "/comments/:commentId",
    


}