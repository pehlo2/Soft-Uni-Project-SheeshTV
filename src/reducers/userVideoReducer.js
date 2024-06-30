const userVideoReducer = (state, action) => {
    debugger
        switch (action?.control) {
            case 'GET_YOUR_VIDEOS':
                return [...action.video];
            case 'ADD_VIDEO':
                return [...state, action.video];
            case 'EDIT_VIDEO':
                return state.map(video => video._id === action.videoId ? action.payload : video);
            case 'DELETE_VIDEO':
                return state.filter(video => video._id !== action.videoId);
            // case 'LIKE_VIDEO':
            //     return state.map(video =>
            //         video._id === action.videoId
            //             ? { ...video, likes: [...video.likes, action.userId] }
            //             : video
            //     );
            // case 'DISLIKE_VIDEO':
            //     return state.map(video =>
            //         video._id === action.videoId
            //             ? { ...video, likes: video.likes.filter(id => id !== action.userId) }
            //             : video
            //     );
            default:
                return state;
        }
    }
    
    export default userVideoReducer;
    