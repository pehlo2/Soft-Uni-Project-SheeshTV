import styles from './Video-modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { useContext, useEffect, useState } from 'react';
import * as videoServices from '../../services/videoServices'
import ReactPlayer from 'react-player';
import InputComments from '../comments-input/Coments-input';
import CommentsTab from '../comments-tab/Comments-tab';
import useComments from '../../hooks/useComments';
import AuthContext from '../../context/authContext';



const VideoModal = ({
    onClose, videoId, videoUrl
}) => {

    const [video, setVideo] = useState({});
  

    useEffect(() => {
        videoServices.getOneVideo(videoId).then(setVideo)
        

    }, [videoId])

    

    return (
        <div className={styles["blur"]}>
            <div className={styles["container"]} onClick={onClose}  >
                {/* <div className={styles["container"]} onClick={onClose} > */}
                < ReactPlayer
                onClick={(e)=>{e.stopPropagation()}}
                    url={`http://localhost:3000/data/${videoUrl}`}
                    config={{
                        file: { 
                            attributes: {
                                disablePictureInPicture: true, controlsList: "nodownload noplaybackrate",
                            },
                        },
                    }}
                    controls
                    className={styles['video']}
                    width='100%'
                    height='100%'
                    playing={true}

                />
                <aside className={styles["aside-section"]} onClick={(e)=>{e.stopPropagation()}}>
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
                        <CommentsTab videoId={video._id}/>
                    </div>
                       
                </aside>

            </div>
        </div>
    )
}

export default VideoModal;



  