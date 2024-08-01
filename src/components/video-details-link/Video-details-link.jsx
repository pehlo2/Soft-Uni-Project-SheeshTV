import styles from './Video-details-links.module.css';

import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as videoServices from '../../services/videoServices';
import ReactPlayer from 'react-player';

import { CommnentsProvider } from '../../context/commentsContext';
import CommentsTab from '../comments-tab/Comments-tab';
import AuthContext from '../../context/authContext';
import LikeShareTab from '../like-share-tab/Like-share-tab';
import UnFollowButton from '../unfollow-button/Unfollow-button';
import FollowButton from '../follow-button/Follow-button';
import ErrorContext from '../../context/errorContext';

const VideoDetails = () => {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const [video, setVideo] = useState({});
    const { videoId } = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const { handleError } = useContext(ErrorContext)
    useEffect(() => {
        videoServices.getOneVideo(videoId)
            .then(setVideo)
            .catch(error => {
                handleError(error.message);

            });
    }, [videoId]);

    useEffect(() => {
        if (video.likes && userId) {
            setIsLiked(video.likes.includes(userId));
        }
    }, [video.likes, userId]);




    const handleFollowHandler = () => {

        setVideo(prevVideo => ({
            ...prevVideo,
            owner: {
                ...prevVideo.owner,
                followers: [...prevVideo.owner.followers, userId]
            }
        }));
        handleFollow()


    };

    const handleUnfollowHandler = () => {

        setVideo(prevVideo => ({
            ...prevVideo,
            owner: {
                ...prevVideo.owner,
                followers: prevVideo.owner.followers.filter(follower => follower !== userId)
            }
        }));

        handleUnfollow()
    };




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
                                        <img src={video.owner?.avatar} alt="" />
                                    </div>
                                    <div className={styles["profile-info-inner"]}>
                                        <h4>{video.owner?.username}</h4>

                                        <div className={styles["video-info"]}>
                                            <h3>{video.title}</h3>
                                            <p>{video.description}</p>
                                        </div>
                                    </div>
                                </div>
                                {userId !== video.owner?._id && (
                                    <>
                                        {video.owner?.followers?.includes(userId) ? (


                                            <UnFollowButton userToUnfollowId={video.owner?._id} onUnfollow={handleUnfollowHandler} />
                                        ) : (
                                            <FollowButton userToFollowId={video.owner?._id} onFollow={handleFollowHandler} />
                                        )}
                                    </>
                                )}
                            </div>
                            <div className={styles["game-choice"]}>
                                <img src={`/gamesIcons/${video.gameChoice}.png`} alt="" />
                                <p>{video.gameChoice}</p>

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
