import styles from './Video-details-links.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import {  useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as videoServices from '../../services/videoServices'
import ReactPlayer from 'react-player';
import InputComments from '../comments-input/Coments-input';


const VideoDetails = ({
}) => {
    const navigate = useNavigate();
    const [video, setVideo] = useState({})
    const { videoId } = useParams()
    useEffect(() => {
        videoServices.getOneVideo(videoId).then(setVideo)

    }, [videoId])

console.log(video);
  
    return (
        <div className={styles["blur"]} >
            <div className={styles["container"]}   onClick={() => { navigate('/dashboard') }} >
                {/* <div className={styles["container"]} onClick={onClose} > */}
                < ReactPlayer
              
                onClick={e => e.stopPropagation()}
                    controls={true}
                    config={{
                        file: {
                            attributes: {
                                disablePictureInPicture: true, controlsList: "nodownload noplaybackrate",
                            },
                        },
                    }}
                    className={styles['video']}
                    url={`http://localhost:3000/data/${video.videoUrl}`}
                    width='100%'
                    height='100%'

                />
                <aside className={styles["aside-section"]}  onClick={e => e.stopPropagation()}>
                    <div className={styles["aside-inner"]}>
                        <div className={styles["aside-info"]}>
                            <div className={styles["profile-tab"]}>
                                <div className={styles["profile-info"]}>
                                    <div className={styles["profile-media"]}>
                                        <img src="/images/8.jpg" alt="" />
                                    </div>
                                    <div>
                                        <h4>{video.owner}</h4>
                                        <p>{video.gameChoice}</p>
                                    </div>
                                </div>
                                <a href="">Follow</a>
                            </div>
                            <div className={styles["video-info"]}>
                                <h3>{video.title}</h3>
                                <p>{video.desctription}</p>
                            </div>
                            <div className={styles["social-tab"]}>
                                <a href=""><FontAwesomeIcon icon={faHeart} /></a>
                                <a href=""><FontAwesomeIcon icon={faComment} /></a>
                                <a href=""><FontAwesomeIcon icon={faLink} /></a>
                            </div>
                        </div>

                        <div className={styles["comments"]}>
                            <div className="user-comment">
                                <h4>Pehlo</h4>
                                <p>commets :Ebalo si maikata bahti proto</p>
                                <p>2min ago</p>
                            </div>
                            <div className="user-comment">
                                <h4>Pehlo</h4>
                                <p>commets :Ebalo si maikata bahti proto</p>
                                <p>2min ago</p>
                            </div>
                            <div className="user-comment">
                                <h4>Pehlo</h4>
                                <p>commets :Ebalo si maikata bahti proto</p>
                                <p>2min ago</p>
                            </div>

                            <div className="user-comment">
                                <h4>Pehlo</h4>
                                <p>commets :Ebalo si maikata bahti proto</p>
                                <p>2min ago</p>
                            </div>



                        </div>
                    </div>
                    < InputComments/>
                </aside>

            </div>
        </div>
    )
}

export default VideoDetails;