import styles from './Videos-dashboard.module.css'
import VideoCard from '../video-card/Video-card';
// import * as videoServices from '../../services/videoServices'
// import { endpoints } from '../lib/endpoints'
import * as videoServices from '../../services/videoServices'
import { useEffect, useState } from 'react';



const VideoDashboard = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        videoServices.getAllvideos().then(videos => setVideos(videos)).then(
            console.log('UPLOADED')
        )
    }, [])



    console.log(videos);


    return (

        <div className={styles["container"]}>
            {videos.map(video => (
                <VideoCard key={video._id} video={video} />
            ))}
            {videos.length === 0 && (
                <h2>No Videos</h2>
            )}
        </div>

    )
}


export default VideoDashboard;