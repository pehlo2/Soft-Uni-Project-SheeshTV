import styles from './Video-modal.module.css'
import { useContext, useEffect, useState } from 'react'
import * as videoServices from '../../services/videoServices'
import ReactPlayer from 'react-player'

import CommentsTab from '../comments-tab/Comments-tab'
import LikeShareTab from '../like-share-tab/Like-share-tab'
import AuthContext from '../../context/authContext'
import FollowButton from '../follow-button/Follow-button'
import { CommnentsProvider } from '../../context/commentsContext'
import UnFollowButton from '../unfollow-button/Unfollow-button'
import ErrorContext from '../../context/errorContext'
import CloseModalButton from '../close-modal-button/Close-modal-button'
import { Link } from 'react-router-dom'



const VideoModal = ({ onClose, videoId, contextType, handleFollow, handleUnfollow }) => {
    const { userId, isAuthenticated } = useContext(AuthContext)
    const [video, setVideo] = useState({})
    const [isLiked, setIsLiked] = useState(video.likes?.includes(userId))
    const { handleError } = useContext(ErrorContext)
    useEffect(() => {
        document.body.classList.add('overflow-y-hidden');
        return () => {
            document.body.classList.remove('overflow-y-hidden');
        };
    }, []);

    useEffect(() => {
        videoServices.getOneVideo(videoId).then(videoData => {
            setVideo(videoData);
            setIsLiked(videoData.likes.includes(userId));

        }).catch(error => {
            handleError(error.message);
        });
    }, [videoId, userId]);

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
        <div className={styles["blur"]} onClick={onClose}>
            <div className={styles["container"]} onClick={onClose}>
                <div className={styles["video"]}>
                    <div className={styles["video-inner"]}>
                        <ReactPlayer
                            onClick={(e) => { e.stopPropagation() }}
                            url={video.videoUrl}
                            config={{
                                file: {
                                    attributes: {
                                        disablePictureInPicture: true, controlsList: "nodownload noplaybackrate",
                                    },
                                },
                            }}
                            controls
                            width='100%'
                            height='100%'
                            playing={true}
                        />
                    </div>
                </div>
                <aside className={styles["aside-section"]} onClick={(e) => { e.stopPropagation() }}>
                    <div className={styles["aside-inner"]}>
                        <div className={styles["aside-info"]}>
                            <div className={styles["profile-tab"]}>
                                <div className={styles["profile-info"]}>
                                    <div className={styles["profile-media"]}>
                                        <img src={video.owner?.avatar} alt="" />
                                    </div>
                                    <div className={styles["profile-info-inner"]}>
                                        <h4> <Link to={`/users/${video.owner?._id}`}>{video.owner?.username}</Link></h4>

                                        <div className={styles["video-info"]}>
                                            <h3>{video.title}</h3>
                                            <p>{video.description}</p>
                                        </div>
                                    </div>
                                </div>
                                {userId !== video.owner?._id && isAuthenticated && (
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
                            <LikeShareTab
                                video={video}
                                isLiked={isLiked}
                                setIsLiked={setIsLiked}
                                contextType={contextType}
                            />
                        </div>
                        <CommnentsProvider videoId={video._id} >
                            <CommentsTab videoId={video._id} videoOwner={video.owner?._id} />
                        </CommnentsProvider>
                    </div>
                </aside>
            </div>
            < CloseModalButton></CloseModalButton>
        </div>
    )
}



{


}
export default VideoModal
