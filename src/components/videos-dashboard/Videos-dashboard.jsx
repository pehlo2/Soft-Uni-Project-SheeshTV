import styles from './Videos-dashboard.module.css'
import VideoCard from '../video-card/Video-card';

import { useContext} from 'react';
import VideoContext from '../../context/videoContext';
import GameChoiceBar from '../game-choice-bar/Game-choice-bar';

import LoaderSpinner from '../loader-spinner/Loader-spiner';




const VideoDashboard = () => {

    const { videos, isLoading } = useContext(VideoContext)


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
            {isLoading && <LoaderSpinner />}
            
        </div>

    )
}


export default VideoDashboard;