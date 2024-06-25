import { createContext, useContext, useEffect, useReducer } from "react"
import videoReducer from "../reducers/videoReducer";

import * as videoServices from "../services/videoServices"
const VideoContext = createContext()

export default VideoContext;



export const VideoProvider = ({
    children
}) => {
   
    const [videos, dispatch] = useReducer(videoReducer, [])


    useEffect(() => {


        videoServices.getAllvideos().then(
            result => {

                dispatch({
                    control: 'GET_ALL_VIDEOS',
                    video: result,
                });

            }
        )

    }, [])



    const likeVideo = (videoId, userId) => {

        videoServices.likeVideo(videoId, userId).then(() => {

            dispatch({
                control: 'LIKE_VIDEO',
                videoId, userId

            })


        })


    }
    const dislikeVideo = (videoId, userId) => {
        videoServices.dislikeVideo(videoId, userId).then(() => {
            dispatch({
                control: 'DISLIKE_VIDEO',
                videoId, userId

            })


        })



    }
    return (
        <VideoContext.Provider
            value={{
                videos,
                likeVideo,
                dislikeVideo,
            }}

        >
            {children}
        </VideoContext.Provider>

    )

}