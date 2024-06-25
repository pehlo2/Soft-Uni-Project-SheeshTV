import styles from './Video-modal.module.css'
import { useContext, useEffect, useState } from 'react';
import * as videoServices from '../../services/videoServices'
import ReactPlayer from 'react-player';

import CommentsTab from '../comments-tab/Comments-tab';

import CommnentsProvider from '../../context/commentsContext';
import LikeShareTab from '../like-share-tab/Like-share-tab'
import AuthContext from '../../context/authContext';



const VideoModal = ({
    onClose, videoId, videoData
}) => {
    const {userId} = useContext(AuthContext)
    const [video, setVideo] = useState(videoData);
    
    const [isLiked, setIsLiked] = useState(video.likes.includes(userId))

    useEffect(() => {
        videoServices.getOneVideo(videoId).then(setVideo)

    }, [videoId])

    console.log(video);
 
    return (
        <div className={styles["blur"]}>
            <div className={styles["container"]} onClick={onClose}  >
                {/* <div className={styles["container"]} onClick={onClose} > */}
                < ReactPlayer
                    onClick={(e) => { e.stopPropagation() }}
                    url={`http://localhost:3000/data/${video.videoUrl}`}
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
                <aside className={styles["aside-section"]} onClick={(e) => { e.stopPropagation() }}>
                    <div className={styles["aside-inner"]}>
                        <div className={styles["aside-info"]}>
                            <div className={styles["profile-tab"]}>
                                <div className={styles["profile-info"]}>
                                    <div className={styles["profile-media"]}>
                                        <img src={video.owner.avatar} alt="" />
                                    </div>
                                    <div>
                                        <h4>{video.owner.username}</h4>
                                        <p>{video.gameChoice}</p>
                                    </div>

                                </div>
                                <a href="">Follow</a>
                            </div>
                            <div className={styles["video-info"]}>
                                <h3>{video.title}</h3>
                                <p>{video.desctription}</p>
                            </div>
                           < LikeShareTab video={video} isLiked={isLiked} setIsLiked={setIsLiked}/>
                        </div>
                        <CommnentsProvider videoId={video._id} >
                            <CommentsTab videoId={video._id} />
                        </CommnentsProvider>
                    </div>

                </aside>

            </div>
        </div>
    )
}

export default VideoModal;



