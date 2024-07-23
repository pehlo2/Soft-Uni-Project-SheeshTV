import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'
export let reqVideos = true
export let reqUserVideos = true
export const resetVideos = () => reqVideos = true
export const resetUserVideos = () => reqVideos = true



export const upload = (videoData, setUploadProgress) => {
    console.log(videoData);
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setUploadProgress(percentComplete);
            }
        });

        xhr.upload.addEventListener('load', () => {
            console.log('Upload complete');
            setUploadProgress(100);
            // resolve(JSON.parse(xhr.responseText));
        });

        xhr.upload.addEventListener('error', () => {
            console.log('Upload failed');
            setUploadProgress(0);
            reject(new Error('Upload failed'));
        });

        xhr.open('POST', `http://localhost:3000${endpoints.upload}`);
        xhr.send(videoData);
    });
};


export const editVideo = async (videoId, videoData) => {
    const video = await request.put(`${endpoints.edit}/${videoId}/edit`, videoData)
    return video
};




export const removeVideo = async (videoId) => {
    await request.del(`${endpoints.delete}/${videoId}/delete`)

};


export const getAllvideos = async (gameChoice, searchQuery, page) => {
    const limit = 20
    if (!reqVideos) {
        return []
    }

    reqVideos = 0
    const query = new URLSearchParams({
        where: `gameChoice=${gameChoice}`,
        search: `${searchQuery}`,
        page: `${page}`,
        limit: limit
    });


    const videos = await request.get(`${endpoints.getAllVideos}?${query}`)

    reqVideos = videos.length === limit
    return videos
}


export const getOneVideo = async (videoId) => {

    const videos = await request.get(`${endpoints.geOneVideo}/${videoId}`)
    return videos
}



export const getUserVideos = async (profileId, page) => {
    const limit = 4
    if (!reqUserVideos) {
        return []
    }
    reqUserVideos = 0
    const query = new URLSearchParams({
        where: `profileId=${profileId}`,
        page: `${page}`,
        limit: limit
    });


    const videos = await request.get(`${endpoints.geUserVideos}?${query}`)
    reqUserVideos = videos.length === limit
    return videos;
}



export const likeVideo = async (videoId, userId) => {

    const likedVideo = await request.post(`${endpoints.geOneVideo}/${videoId}/like`, { userId })

    return likedVideo
}

export const dislikeVideo = async (videoId, userId) => {

    const dislikedVideo = await request.post(`${endpoints.geOneVideo}/${videoId}/dislike`, { userId })

    return dislikedVideo
}

export const videoCount = async (userId) => {
    const videoCount = await request.get(`${endpoints.geOneVideo}/videoCount/${userId}`,)
    return videoCount
} 