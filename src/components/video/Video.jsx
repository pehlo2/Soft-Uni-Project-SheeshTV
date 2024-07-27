

import styles from './Video.module.css'
import { useContext, useState } from 'react';
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


const Video = ({ video }) => {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const { userId, isAuthenticated, avatar } = useContext(AuthContext)


    const { deleteVideo } = useContext(UserVideosContext)
    const deleteVideoHandler = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this game?');
        if (confirmation) {
            await deleteVideo(video._id);

        }
    }

    return (
        <div className={styles["video"]}>
            <div className={styles["video-wrapper"]}>
                <div className={styles["video-owner"]}>
                    <div className={styles["video-owner-info"]}>
                        <img src={video.owner.avatar} alt="" />

                        <h3>{video.owner.username}</h3>
                        {userId !== video.owner._id && isAuthenticated && (<>

                            {video.owner.followers.includes(userId) && < UnFollowButton userToUnfollowId={video.owner._id} />}
                            {video.owner.followers.includes(userId) && < FollowButton userToFollowId={video.owner._id} />}

                        </>
                        )}

                    </div>
                    {userId === video.owner._id && isAuthenticated && (
                        <div className={styles["video-delete"]}>
                            <button onClick={deleteVideoHandler}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button>
                        </div>
                    )}

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
                    <a><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>Like<span>{video.likes.length}</span></a>
                    <a onClick={() => setShowModal(!showModal)}><FontAwesomeIcon icon={faComment}></FontAwesomeIcon>Comments</a>
                    <a onClick={() => copyVideoLink(video._id)}><FontAwesomeIcon icon={faLink}></FontAwesomeIcon>Copy Link</a>
                </div>
            </div>
            {showModal && <VideoModal onClose={() => setShowModal(false)} videoId={video._id} videoData={{ ...video }} />}
            {showEdit && <EditVideo onClose={() => setShowEdit(false)} videoId={video._id} {...video} />}
        </div>





    )
}

export default Video;