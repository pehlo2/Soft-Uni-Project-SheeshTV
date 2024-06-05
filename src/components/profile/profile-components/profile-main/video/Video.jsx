
import Comments from '../comments/Coments';
import styles from './Video.module.css'
import { useState } from 'react';
import VideoModal from '../../../../video-modal/Video-modal';

const Video = () => {
     const [showModal, setShowModal] = useState(false);
   

    return (
        <div className={styles["video"]}>
            <div className={styles["video-wrapper"]}>
                <div className={styles["video-owner"]}>
                    <img src="/images/8.jpg" alt="" />
                    <h3>pehlo</h3>
                    <a href="">Follow</a>
                </div>
                <video width="100%" height="100%" controls>
                    <source src="./video/into-page.mp4" type="video/mp4" />
                    <source src="movie.ogg" type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
                <div className={styles["video-info"]}>
                    <h2>Penta steal</h2>
                    <p>5 days ago</p>
                    <p>Valorant</p>
                </div>
                <div className={styles["social-tab"]}>
                    <a href="">Likes</a>
                    <a onClick={() => setShowModal(!showModal)}>Comments</a>
                    <a href="">Copy Link</a>
                </div>
            </div>
            <Comments />
            {showModal && <VideoModal  onClose={() => setShowModal(false)}/>}
            
        </div>



    )
}

export default Video;