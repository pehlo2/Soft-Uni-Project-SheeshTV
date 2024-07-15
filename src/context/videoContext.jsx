import { createContext, useContext, useEffect, useReducer, useState } from "react";
import videoReducer from "../reducers/videoReducer";
import * as videoServices from "../services/videoServices";
import AuthContext from "./authContext";
import { useLocation } from "react-router-dom";

const VideoContext = createContext();

export default VideoContext;

export const VideoProvider = ({ children }) => {
    const [videos, dispatch] = useReducer(videoReducer, []);
    const { userId } = useContext(AuthContext);
    const [gameChoice, setGameChoice] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation()
    useEffect(() => {
        videoServices.getAllvideos(gameChoice, searchQuery).then(result => {
            dispatch({
                control: 'GET_ALL_VIDEOS',
                video: result,
            });
        });

    }, [userId, gameChoice, searchQuery]);


    useEffect(() => {
        return () => {
            
            setGameChoice('');
        };
    }, [location]);






    const likeVideo = async (videoId, userId) => {
        await videoServices.likeVideo(videoId, userId).then(() => {
            dispatch({
                control: 'LIKE_VIDEO',
                videoId, userId
            });
        });
    };

    const dislikeVideo = async (videoId, userId) => {
        await videoServices.dislikeVideo(videoId, userId).then(() => {
            dispatch({
                control: 'DISLIKE_VIDEO',
                videoId, userId
            });
        });
    };

    const filterVideosByGameChoice = (gameChoice) => {
        setGameChoice(gameChoice);
        if (!gameChoice) {
            setSearchQuery('');
        }
    };

    const filterVideosBySearchQuery = (searchQuery) => {
        setSearchQuery(searchQuery);
    };

    return (
        <VideoContext.Provider
            value={{
                videos,
                likeVideo,
                dislikeVideo,
                filterVideosByGameChoice,
                filterVideosBySearchQuery
            }}
        >
            {children}
        </VideoContext.Provider>
    );
}
