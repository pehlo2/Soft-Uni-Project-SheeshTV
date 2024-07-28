const userVideoReducer = (state = [], action) => {
    debugger
    switch (action.type) {
        case 'GET_YOUR_VIDEOS':
            return [...state, ...action.videos];
        case 'ADD_VIDEO':
            return [action.video, ...state];
        case 'EDIT_VIDEO':
            return state.map(video => video._id === action.videoId ? action.video : video);
        case 'DELETE_VIDEO':
            return state.filter(video => video._id !== action.videoId);
        case 'RESET':
            return [];
        case 'CHANGE_OWNER_VIDEOS_AVATAR':
            return state.map(video => ({
                ...video,
                owner: {
                    ...video.owner,
                    avatar: action.userData.avatar,
                    username: action.userData.username
                },

            }));

        case 'LIKE_VIDEO':
            return state.map(video =>
                video._id === action.videoId
                    ? { ...video, likes: [...video.likes, action.userId] }
                    : video
            );
        case 'DISLIKE_VIDEO':
            return state.map(video =>
                video._id === action.videoId
                    ? { ...video, likes: video.likes.filter(id => id !== action.userId) }
                    : video
            );
        default:
            return state;
    }
};

export default userVideoReducer;
