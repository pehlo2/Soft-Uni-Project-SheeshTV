export const endpoints = {
    // users
    getUser:'/users/profile',
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    getAllUsers: "/users/",
    getOneUser: "/users/profile",

    // videos
    upload: "/data/videos/upload",
    getAllVideos: "/data/videos/",
    geOneVideo: "/data/videos",
    geUserVideos: "/data/videos/user-videos",

    //comments

    createComment: "/comments",
    videoComments: "/comments",
    getOneComment: "/comments/:commentId",
    deleteComment: "/comments/:commentId",
    






}