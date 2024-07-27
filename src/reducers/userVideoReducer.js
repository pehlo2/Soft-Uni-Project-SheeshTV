const userVideoReducer = (state, action) => {

    switch (action?.control) {
        case 'GET_YOUR_VIDEOS':
            return [...state, ...action.videos];
        case 'ADD_VIDEO':
            return [...state, action.video];
        case 'EDIT_VIDEO':
            return state.map(video => video._id === action.videoId ? action.video : video);
        case 'DELETE_VIDEO':
            return state.filter(video => video._id !== action.videoId);
        case 'RESET': return []

        case 'CHANGE_OWNER_VIDEOS_AVATAR':
            return state.map(video => ({
                ...video,
                owner: {
                    ...video.owner,
                    avatar: action.userData.avatar
                }
            }))

        default:
            return state;
    }
}

export default userVideoReducer;
