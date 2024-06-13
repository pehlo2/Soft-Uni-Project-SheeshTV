
import Comments from '../../../../comments-input/Coments-input';
import styles from './Video.module.css'
import { useState } from 'react';
import VideoModal from '../../../../video-modal/Video-modal';
import ReactPlayer from 'react-player';

const Video = ({video}) => {
     const [showModal, setShowModal] = useState(false);
   
    console.log(video);
    return (
        <div className={styles["video"]}>
            <div className={styles["video-wrapper"]}>
                <div className={styles["video-owner"]}>
                    <img src="/images/8.jpg" alt="" />
                    <h3>{video.owner.username}</h3>
                    <a href="">Follow</a>
                </div>
                   < ReactPlayer
                controls
                className={styles['react-player']}
                url={`http://localhost:3000/data/${video.videoUrl}`}
                width='100%'
                height='100%'
                light={
                    <img className={styles["thumbnail"]}
                        src={`http://localhost:3000/data/${video.thumbnail}`}
                        alt={video.thumbnail} />
                }
            />
                <div className={styles["video-info"]}>
                    <h2>{video.title}</h2>
                    <p>{video.created_at}</p>
                    <p>{video.description}</p>
                    <p>{video.gameChoice}</p>
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