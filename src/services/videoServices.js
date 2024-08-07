import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'


export let reqVideos = true
export let reqUserVideos = true
export const resetVideos = () => reqVideos = true
export const resetUserVideos = () => reqUserVideos = true

export const upload = (videoData, setUploadProgress) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                console.log(`Upload progress: ${percentComplete}%`);
                setUploadProgress(percentComplete);
            }
        });

        xhr.upload.addEventListener('load', () => {
            console.log('File upload completed. Waiting for server response...');
        });

        xhr.upload.addEventListener('error', () => {
            console.log('Upload failed');
            setUploadProgress(0);
            reject(new Error('Upload failed'));
        });

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Server response received:', xhr.responseText);
                    const response = JSON.parse(xhr.responseText);
                    setUploadProgress(100); // Only set to 100% here after server response
                    resolve(response);
                } else {
                    console.log('Server error:', xhr.responseText);
                    setUploadProgress(0);
                    reject(new Error(xhr.responseText || 'Failed to upload video'));
                }
            }
        };

        xhr.open('POST', `${window.remoteOrigin}/data/videos/upload`);
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