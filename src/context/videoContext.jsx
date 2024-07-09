import { createContext, useContext, useEffect, useReducer, useState } from "react"
import videoReducer from "../reducers/videoReducer";

import * as videoServices from "../services/videoServices"
import AuthContext from "./authContext";
const VideoContext = createContext()

export default VideoContext;



export const VideoProvider = ({
    children
}) => {

    const [videos, dispatch] = useReducer(videoReducer, [])
    const { userId } = useContext(AuthContext)
    const [gameChoice ,setGameChoice] =useState('')


    useEffect(() => {


        videoServices.getAllvideos(gameChoice).then(
            result => {

                dispatch({
                    control: 'GET_ALL_VIDEOS',
                    video: result,
                });

            }
        )

    }, [gameChoice,userId])



    const likeVideo = async (videoId, userId) => {

        await videoServices.likeVideo(videoId, userId).then(() => {

            dispatch({
                control: 'LIKE_VIDEO',
                videoId, userId

            })

        })


    }
    const dislikeVideo = async (videoId, userId) => {
        await videoServices.dislikeVideo(videoId, userId).then(() => {
            dispatch({
                control: 'DISLIKE_VIDEO',
                videoId, userId

            })


        })



    }

    const filterVideosByGameChoice =(gameChoice)=>{
        debugger
        setGameChoice(gameChoice)

    }









    return (
        <VideoContext.Provider
            value={{
                videos,
                likeVideo,
                dislikeVideo,
                filterVideosByGameChoice
            }}

        >
            {children}
        </VideoContext.Provider>

    )

}