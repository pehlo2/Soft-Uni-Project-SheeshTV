import styles from './Videos-dashboard.module.css'
import VideoCard from '../video-card/Video-card';
// import * as videoServices from '../../services/videoServices'
// import { endpoints } from '../lib/endpoints'
import * as videoServices from '../../services/videoServices'
import { useContext, useEffect, useState } from 'react';
import VideoContext from '../../context/videoContext';
import GameChoiceBar from '../game-choice-bar/Game-choice-bar';
import Notifications from '../notifications/Notifications';
import AuthContext from '../../context/authContext';
import LoaderSpinner from '../loader-spinner/Loader-spiner';
import { ErrorComponent } from '../error/Error';



const VideoDashboard = () => {

    const { videos, isLoading } = useContext(VideoContext)


    return (

        <div className={styles["container"]}>
           < ErrorComponent/>
            <GameChoiceBar />
            <div className={styles["video-wrapper"]}>
                {videos.length === 0 && (

                    <h2>No Videos</h2>
                )}
                {videos.map(video => (
                    <VideoCard key={video._id} {...video} />
                ))}

            </div>
            {isLoading && <LoaderSpinner />}
            
        </div>

    )
}


export default VideoDashboard;