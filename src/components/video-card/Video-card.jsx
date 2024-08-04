import { useRef, useState } from "react";
import styles from "./Video-card.module.css"
import ReactPlayer from "react-player";
import VideoModal from "../video-modal/Video-modal";
import timeDifferenceToString from "../../utils/timeDifferenceToString";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";





const VideoCard = ({
    videoUrl,
    thumbnail,
    title,
    viewCount,
    gameChoice,
    _id, likes, owner, created_at
}) => {
    const [playing, setPlaying] = useState(false)
    const [showModal, setShowModal] = useState(false);
    let timeOutId = 0
    const playerRef = useRef(null);



    return (



        <div className={styles["video-card"]}>
            <div className={styles["media"]}
                onClick={() => setShowModal(!showModal)}
                onMouseEnter={() => {
                    timeOutId = setTimeout(() => {
                        setPlaying(true);

                        playerRef.current.setState({ showPreview: false })
                    }, 300);

                }}
                onMouseLeave={() => {
                    if (timeOutId !== 0) {

                        clearTimeout(timeOutId)
                    }

                    setPlaying(false)
                }}
            >
                < ReactPlayer

                    config={{
                        file: {
                            attributes: {
                                disablePictureInPicture: true, controlsList: "nodownload noplaybackrate",
                            },
                        },
                    }}
                    className={styles['react-player']}
                    ref={playerRef}
                    muted={true}
                    playing={playing}
                    url={videoUrl}
                    width='100%'
                    height='100%'
                    light={
                        <img className={styles["thumbnail"]}
                            src={thumbnail}
                            alt={thumbnail} />
                    }

                />

            </div>

            <div className={styles["video-info"]}>
                <div className={styles["owner-info"]}>
                    <img src={owner?.avatar} alt="" />
                </div>

                <div className={styles["video-stats"]}>
                    <div className={styles["top-info"]}>
                        <h4>{title}</h4>
                        <div className={styles["game-choice"]}>
                            <img src={`gamesIcons/${gameChoice}.png`} alt="" />
                            <p> {gameChoice}
                            </p>
                        </div>
                    </div>
                    <div className={styles["bottom-info"]}>
                        <p><Link to={`/users/${owner?._id}`}>{owner?.username}</Link></p>
                        <div className={styles["view-date"]}>
                            <p><span>{viewCount}</span> views</p>
                            <FontAwesomeIcon icon={faCircle} />
                            <p>{timeDifferenceToString(created_at)}</p>
                        </div>
                    </div>

                </div>

            </div>

            {showModal && <VideoModal onClose={() => setShowModal(false)} videoId={_id} videoData={{
                videoUrl,
                thumbnail,
                title,
                viewCount,
                gameChoice,
                _id, likes, owner
            }} contextType="video" />}
        </div>
    )
}


export default VideoCard;