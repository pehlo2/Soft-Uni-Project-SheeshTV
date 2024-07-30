import styles from './Video-count.module.css'
import React, { useContext, useEffect, useState } from 'react';
import * as videoServices from '../../services/videoServices';
import UserVideosContext from '../../context/userVideoContext';
const VideoCount = ({ userId }) => {
    const [videoCount,setVideoCount] = useState();
    const { videos } = useContext(UserVideosContext)
    useEffect(() => {
        videoServices.videoCount(userId).then((videoCount)=>{
    
            setVideoCount(videoCount.videoCount)})

    }, [userId,videos]);
   
    return (
        <div className={styles["clips"]}>
            <p>{videoCount}</p>
            <p>Videos</p>
        </div>
    );
};

export default VideoCount;