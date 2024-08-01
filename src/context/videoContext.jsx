import { createContext, useContext, useEffect, useReducer, useState } from "react";
import videoReducer from "../reducers/videoReducer";
import * as videoServices from "../services/videoServices";
import AuthContext from "./authContext";
import { useLocation } from "react-router-dom";
import ErrorContext from "./errorContext";

const VideoContext = createContext();

export default VideoContext;

export const VideoProvider = ({ children }) => {
    const [videos, dispatch] = useReducer(videoReducer, []);
    const { userId } = useContext(AuthContext);
    const [gameChoice, setGameChoice] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation()
    const { handleError } = useContext(ErrorContext)

    useEffect(() => {
        videoServices.resetVideos()
    }, []);

    useEffect(() => {
        return () => {
            setGameChoice('');
        };
    }, [location.pathname]);

    useEffect(() => {
        setIsLoading(true)

        videoServices.getAllvideos(gameChoice, searchQuery, page).then(result => {

            dispatch({
                control: 'GET_ALL_VIDEOS',
                videos: result,
            });
            setIsLoading(false)

        }).catch(error => {
            handleError(error.message);
            setIsLoading(false);
        })
    }, [userId, gameChoice, searchQuery, page]);

    const handleScroll = () => {
        if (videoServices.reqVideos === false) {
            window.removeEventListener("scroll", handleScroll);
            return
        }
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && location.pathname === "/dashboard") {
            setIsLoading(true)
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    const likeVideo = async (videoId, userId) => {
        await videoServices.likeVideo(videoId, userId).then(() => {
            dispatch({
                control: 'LIKE_VIDEO',
                videoId, userId
            });
        }).catch(error => {
            handleError(error.message);
          
        });
    };

    const dislikeVideo = async (videoId, userId) => {
        debugger
        await videoServices.dislikeVideo(videoId, userId).then(() => {

            dispatch({
                control: 'DISLIKE_VIDEO',
                videoId, userId
            });
        }).catch(error => {
            handleError(error.message);
           
        });
    };

    const filterVideosByGameChoice = (gameChoice) => {
        resetState();
        setGameChoice(gameChoice);
        setSearchQuery('');
    };

    const filterVideosBySearchQuery = (newSearchQuery) => {
        debugger
        if (searchQuery !== newSearchQuery) {
            resetState();
        }
        if (newSearchQuery == "" && gameChoice !== "") {

            setGameChoice(gameChoice);
        } else {
            setGameChoice('');
        }
        setSearchQuery(newSearchQuery);
    };



    const resetState = () => {
        videoServices.resetVideos();
        dispatch({
            control: 'RESET',
        });
        setPage(1);
    };
    const handleClickAll = () => {
        if (searchQuery != '') {
            resetState()
            setSearchQuery('')

        };


    }


    return (
        <VideoContext.Provider
            value={{
                videos,
                likeVideo,
                dislikeVideo,
                filterVideosByGameChoice,
                filterVideosBySearchQuery,
                isLoading,
                gameChoice,
                handleClickAll,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}

        </VideoContext.Provider>
    );
}
