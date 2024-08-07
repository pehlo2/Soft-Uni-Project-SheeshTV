

import styles from './Video.module.css'
import { useContext, useEffect, useState } from 'react';
import VideoModal from '../video-modal/Video-modal';
import ReactPlayer from 'react-player';
import UserVideosContext from '../../context/userVideoContext';
import EditVideo from '../edit-video/Edit-Video';
import FollowButton from '../follow-button/Follow-button';
import UnFollowButton from '../unfollow-button/Unfollow-button';
import timeDifferenceToString from '../../utils/timeDifferenceToString';
import { copyVideoLink } from '../../utils/copyVideoLink';
import { faComment, faEdit, faEye, faHeart, faLink, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '../../context/authContext';
import Popup from '../pop-up/Pop-up';
import ConfirmDeleteModal from '../confirm-dialog-modal/Confirm-dialog-modal';




const Video = ({ video, handleFollow, handleUnfollow }) => {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const { userId, isAuthenticated } = useContext(AuthContext)
    const [showPopup, setShowPopup] = useState(false);
    const [isLiked, setIsLiked] = useState(video.likes?.includes(userId))
    const [showConfirmation, setshowConfirmation] = useState(false);
    const { deleteVideo, likeVideo, dislikeVideo } = useContext(UserVideosContext)

    useEffect(() => {
        setIsLiked(video.likes?.includes(userId));
    }, [video.likes, userId]);

    const handleConfirmDelete = async () => {
        await deleteVideo(video._id);
        setShowModal(false);
    };



    const handleCopyLink = () => {
        copyVideoLink(video._id);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 1500);
    };


    const handleLike = () => {
        likeVideo(video._id, userId)
        setIsLiked(true)
    }

    const handleDisLike = () => {
        dislikeVideo(video._id, userId)
        setIsLiked(false)
    }



    return (
        <div className={styles["video"]}>
            <div className={styles["video-wrapper"]}>
                <div className={styles["video-owner"]}>
                    <div className={styles["video-owner-info"]}>
                        <img src={video.owner.avatar} alt="" />

                        <h3>{video.owner.username}</h3>
                        {userId !== video.owner._id && isAuthenticated && (<>
                            {video.owner.followers?.includes(userId) && < UnFollowButton userToUnfollowId={video.owner._id} onUnfollow={handleUnfollow} />}
                            {!video.owner.followers?.includes(userId) && < FollowButton userToFollowId={video.owner._id} onFollow={handleFollow} />}

                        </>
                        )}

                    </div>
                    {userId === video.owner._id && isAuthenticated && (
                        <div className={styles["video-delete"]}>
                            <button onClick={() => setshowConfirmation(true)}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button>
                        </div>
                    )}

                </div>
                < ReactPlayer
                    controls
                    className={styles['react-player']}
                    url={`${video.videoUrl}`}
                    width='100%'
                    height='100%'
                    light={
                        <img className={styles["thumbnail"]}
                            src={video.thumbnail}
                            alt={video.thumbnail} />
                    }
                />
                <div className={styles["video-info"]}>
                    <div className={styles["video-info-wrapper"]}>
                        <div className={styles["video-info-inner"]}>
                            <h2>{video.title}</h2>
                            <p className={styles["time"]} >{timeDifferenceToString(video.created_at)} ago</p>
                            <p>{video.description}</p>
                        </div>
                        <a className={styles["views-count"]}><FontAwesomeIcon icon={faEye}></FontAwesomeIcon>{video.viewCount}</a>
                    </div>

                    <div className={styles["game-choice"]}>
                        <img src={`/gamesIcons/${video.gameChoice}.png`} alt="" />
                        <p>
                            {video.gameChoice}
                        </p>
                    </div>
                    {userId === video.owner._id && (<a onClick={() => setShowEdit(!showEdit)} className={styles["edit-button"]}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>Edit video</a>)}

                </div>
                <div className={styles["social-tab"]}>
                    {isLiked && (
                        <a
                            className={styles["liked"]}
                            onClick={isAuthenticated ? handleDisLike : null}
                            style={{ cursor: isAuthenticated ? 'pointer' : 'not-allowed', pointerEvents: isAuthenticated ? 'auto' : 'none' }}
                        >
                            <FontAwesomeIcon icon={faHeart} /> Like
                        </a>
                    )}
                    {!isLiked && (
                        <a
                            onClick={isAuthenticated ? handleLike : null}
                            style={{ cursor: isAuthenticated ? 'pointer' : 'not-allowed', pointerEvents: isAuthenticated ? 'auto' : 'none' }}
                        >
                            <FontAwesomeIcon icon={faHeart} /> Like<span></span>
                        </a>
                    )}
                    <a onClick={() => setShowModal(!showModal)}>
                        <FontAwesomeIcon icon={faComment} /> Comments
                    </a>
                    <a className={styles["copy-link"]} onClick={handleCopyLink}>
                        <FontAwesomeIcon icon={faLink} />
                        <Popup isVisible={showPopup} /> Copy Link
                    </a>
                </div>
            </div>
            {showModal && <VideoModal onClose={() => setShowModal(false)} videoId={video._id} videoData={{ ...video }} contextType="userVideos" handleUnfollow={handleUnfollow}
                handleFollow={handleFollow} />}
            {showEdit && <EditVideo onClose={() => setShowEdit(false)} videoId={video._id} {...video} />}
            {showConfirmation && <ConfirmDeleteModal show={() => setshowConfirmation(true)} handleClose={() => setshowConfirmation(false)} handleConfirm={handleConfirmDelete} type='Video' />}
        </div>






    )
}

export default Video;