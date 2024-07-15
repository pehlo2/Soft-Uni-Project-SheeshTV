import styles from './Video-details-links.module.css';

import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as videoServices from '../../services/videoServices';
import ReactPlayer from 'react-player';

import { CommnentsProvider } from '../../context/commentsContext';
import CommentsTab from '../comments-tab/Comments-tab';
import AuthContext from '../../context/authContext';
import LikeShareTab from '../like-share-tab/Like-share-tab';

const VideoDetails = () => {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const [video, setVideo] = useState({});
    const { videoId } = useParams();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        videoServices.getOneVideo(videoId)
            .then(setVideo)
            .catch(console.error);
    }, [videoId]);

    useEffect(() => {
        if (video.likes && userId) {
            setIsLiked(video.likes.includes(userId));
        }
    }, [video.likes, userId]);

    return (
        <div className={styles["blur"]}>
            <div className={styles["container"]} onClick={() => { navigate('/dashboard') }}>
                <ReactPlayer
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
                    url={video.videoUrl}
                    width='100%'
                    height='100%'
                />
                <aside className={styles["aside-section"]} onClick={e => e.stopPropagation()}>
                    <div className={styles["aside-inner"]}>
                        <div className={styles["aside-info"]}>
                            <div className={styles["profile-tab"]}>
                                <div className={styles["profile-info"]}>
                                    <div className={styles["profile-media"]}>
                                        <img src="/images/8.jpg" alt="" />
                                    </div>
                                    <div>
                                        <h4>{video.owner?.username}</h4>
                                        <p>{video.gameChoice}</p>
                                    </div>
                                </div>
                                <a href="">Follow</a>
                            </div>
                            <div className={styles["video-info"]}>
                                <h3>{video.title}</h3>
                                <p>{video.description}</p>
                            </div>
                            <LikeShareTab video={video} isLiked={isLiked} setIsLiked={setIsLiked} />
                        </div>
                        <CommnentsProvider videoId={video._id}>
                            <CommentsTab videoId={video._id} />
                        </CommnentsProvider>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default VideoDetails;
