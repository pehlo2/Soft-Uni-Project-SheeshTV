export const endpoints = {
    // users
    getUser: '/users/profile',
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    getAllNotFollowedUsers: "/users",
    getOneUser: "/users",
    followUser: "/users/follow",
    unFollowUser: "/users/unfollow",
    updateProfile: "/users",

    // videos
    upload: "/data/videos/upload",
    getAllVideos: "/data/videos/",
    geOneVideo: "/data/videos",
    geUserVideos: "/data/videos/user-videos",
    delete: '/data/videos/',
    edit: '/data/videos/',



    //comments

    createComment: "/comments",
    videoComments: "/comments",
    getOneComment: "/comments/:commentId",
    deleteComment: "/comments/:commentId",



}