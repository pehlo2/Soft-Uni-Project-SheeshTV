import { createContext, useContext, useEffect, useReducer } from "react"
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


    useEffect(() => {


        videoServices.getAllvideos().then(
            result => {

                dispatch({
                    control: 'GET_ALL_VIDEOS',
                    video: result,
                });

            }
        )

    }, [userId])



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