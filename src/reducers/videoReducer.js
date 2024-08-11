const videoReducer = (state, action) => {

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
      
        default:
            return state;
    }
}

export default videoReducer;
