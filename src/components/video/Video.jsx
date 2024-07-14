

import styles from './Video.module.css'
import { useContext, useState } from 'react';
import VideoModal from '../video-modal/Video-modal';
import ReactPlayer from 'react-player';
import UserVideosContext from '../../context/userVideoContext';
import EditVideo from '../edit-video/Edit-Video';
import FollowButton from '../follow-button/Follow-button';
import UnFollowButton from '../unfollow-button/Unfollow-button';
import timeDifferenceToString from '../../utils/timeDifferenceToString';


const Video = ({ video }) => {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

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
                    <img src={video.owner.avatar} alt="" />
                    <h3>{video.owner.username}</h3>
                    < FollowButton userToFollowId={video.owner._id} />
                    < UnFollowButton userToUnfollowId={video.owner._id} />
                    <div className={styles["video-crud"]}>

                        <button onClick={deleteVideoHandler}>delete</button>

                    </div>
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
                    <p>{timeDifferenceToString(video.created_at)} ago</p>
                    <p>{video.description}</p>
                    <div className={styles["game-choice"]}>
                        <img src={`/gamesIcons/${video.gameChoice}.png`} alt="" />
                        <p>{video.gameChoice}
                        </p>
                    </div>
                    <a onClick={() => setShowEdit(!showEdit)}>Edit</a>
                </div>
                <div className={styles["social-tab"]}>
                    <a href="">Likes</a>
                    <a onClick={() => setShowModal(!showModal)}>Comments</a>
                    <a href="">Copy Link</a>
                </div>
            </div>
            {showModal && <VideoModal onClose={() => setShowModal(false)} videoId={video._id} videoData={{ ...video }} />}
            {showEdit && <EditVideo onClose={() => setShowEdit(false)} videoId={video._id} {...video} />}
        </div>




    )
}

export default Video;