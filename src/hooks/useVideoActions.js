import { useEffect, useState } from "react";
import * as videoServices from '../services/videoServices'


export const useVideoActions = (profileId) => {

    const [videos, setVideos] = useState([]);;

    useEffect(() => {
        videoServices.getUserVideos(profileId).then(setVideos)


    }, [profileId])

    const addVideo = async (formData ,setUploadProgress) => {
        const newVideo = await videoServices.upload(formData, setUploadProgress)
        setVideos((videos) => [...videos, newVideo])

    };

    const deleteVideo = (videoId) => {
        videoServices.removeVideo(videoId);
        setVideos(videos.filter(video => video._id !== videoId));
    };

    const editVideo = async (videoId, videoData) => {
        const updatedVideo = await videoServices.editVideo(videoId, videoData);
        setVideos((videos) => videos.map(video=> video._id === videoId ? updatedVideo :video))

    }



    return {
        videos,
        addVideo,
        deleteVideo,
        editVideo,

    };
};
