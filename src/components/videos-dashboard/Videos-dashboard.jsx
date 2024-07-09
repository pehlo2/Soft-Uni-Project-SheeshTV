import styles from './Videos-dashboard.module.css'
import VideoCard from '../video-card/Video-card';
// import * as videoServices from '../../services/videoServices'
// import { endpoints } from '../lib/endpoints'
import * as videoServices from '../../services/videoServices'
import { useContext, useEffect, useState } from 'react';
import VideoContext from '../../context/videoContext';
import GameChoiceBar from '../game-choice-bar/Game-choice-bar';



const VideoDashboard = () => {
    // const [videos, setVideos] = useState([])

    const { videos } = useContext(VideoContext)

    return (

        <div className={styles["container"]}>
            <GameChoiceBar />
            <div className={styles["video-wrapper"]}>
                {videos.length === 0 && (

                    <h2>No Videos</h2>
                )}
                {videos.map(video => (
                    <VideoCard key={video._id} {...video} />
                ))}

            </div>

        </div>

    )
}


export default VideoDashboard;