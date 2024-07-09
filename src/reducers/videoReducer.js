const videoReducer = (state, action) => {

    switch (action?.control) {
        case 'GET_ALL_VIDEOS':
            return [...action.video];
        // case 'ADD_VIDEO':
        //     return [...state, action.video];
        // case 'EDIT_VIDEO':
        //     return state.map(video => video._id === action.videoId ? action.payload : video);
        // case 'DELETE_VIDEO':
        //     return state.filter(video => video._id !== action.video);
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
        case 'FILTER_VIDEO_BY_GAME_CHOICE':
            console.log(state);
            return state.filter(video => video.gameChoice === action.gameChoice);
        
        default:
            return state;
    }
}

export default videoReducer;

