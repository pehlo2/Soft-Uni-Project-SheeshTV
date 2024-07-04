import * as request from '../lib/request'
import { endpoints } from '../lib/endpoints'



export const upload = (videoData, setUploadProgress) => {
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
            resolve(JSON.parse(xhr.responseText));
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


export const editVideo = async (videoId,videoData) => {

   
    const video = await request.put(`${endpoints.edit}/${videoId}/edit`, videoData)
    return video
};




export const removeVideo = async (videoId) => {
    await request.del(`${endpoints.delete}/${videoId}/delete`)

};


export const getAllvideos = async () => {

    const games = await request.get(endpoints.getAllVideos)

    return games
}

export const getOneVideo = async (videoId) => {

    const games = await request.get(`${endpoints.geOneVideo}/${videoId}`)
    return games
}


export const getUserVideos = async (profileId) => {

    const query = new URLSearchParams({
        where: `profileId="${profileId}"`,
    });


    const videos = await request.get(`${endpoints.geUserVideos}?${query}`)
    return videos;
}




// export const getAllVideoComments = async (videoId) => {

//     const query = new URLSearchParams({
//         where: `videoId="${videoId}"`,
//     });

//     const result = await request.get(`${endpoints.videoComments}?${query}`);

//     return result;
// };



















export const likeVideo = async (videoId, userId) => {

    const likedVideo = await request.post(`${endpoints.geOneVideo}/${videoId}/like`, { userId })


    return likedVideo
}

export const dislikeVideo = async (videoId, userId) => {

    const dislikedVideo = await request.post(`${endpoints.geOneVideo}/${videoId}/dislike`, { userId })

    return dislikedVideo
} 