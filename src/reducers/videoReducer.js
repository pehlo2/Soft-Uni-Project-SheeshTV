const videoReducer = (state, action) => {
    debugger
    switch (action?.control) {
        case 'GET_ALL_VIDEOS':
            return [...state, ...action.videos];
        case 'RESET': return[]
           
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
        // case 'FILTER_VIDEO_BY_GAME_CHOICE':
        //     console.log(state);
        //     return state.filter(video => video.gameChoice === action.gameChoice);

        default:
            return state;
    }
}

export default videoReducer;
