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



const VideoModal = ({ onClose, videoId, contextType, handleFollow, handleUnfollow }) => {
    const { userId } = useContext(AuthContext)
    const [video, setVideo] = useState({})
    const [isLiked, setIsLiked] = useState(video.likes?.includes(userId))



    useEffect(() => {
        videoServices.getOneVideo(videoId).then(videoData => {
            setVideo(videoData);
            setIsLiked(videoData.likes.includes(userId));

        });
    }, [videoId, userId]);
   
    const handleFollowHandler = () => {
        debugger
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
        debugger
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
            <div className={styles["container"]} onClick={onClose}>
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
                                        <img src={video.owner?.avatar} alt="" />
                                    </div>
                                    <div>
                                        <h4>{video.owner?.username}</h4>
                                        <div className={styles["game-choice"]}>
                                            <img src={`/gamesIcons/${video.gameChoice}.png`} alt="" />
                                            <p>{video.gameChoice}</p>
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
                            <div className={styles["video-info"]}>
                                <h3>{video.title}</h3>
                                <p>{video.desctription}</p>
                            </div>
                            <LikeShareTab
                                video={video}
                                isLiked={isLiked}
                                setIsLiked={setIsLiked}
                                contextType={contextType}
                            />
                        </div>
                        <CommnentsProvider videoId={video._id}>
                            <CommentsTab videoId={video._id} />
                        </CommnentsProvider>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default VideoModal
