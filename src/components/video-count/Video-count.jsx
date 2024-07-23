import styles from './Video-count.module.css'
import React, { useEffect, useState } from 'react';
import * as videoServices from '../../services/videoServices';
const VideoCount = ({ userId }) => {
    const [videoCount,setVideoCount] = useState();

    useEffect(() => {
        videoServices.videoCount(userId).then((videoCount)=>{
    
            setVideoCount(videoCount.videoCount)})

    }, [userId]);
   
    return (
        <div className={styles["clips"]}>
            <p>{videoCount}</p>
            <p>Videos</p>
        </div>
    );
};

export default VideoCount;