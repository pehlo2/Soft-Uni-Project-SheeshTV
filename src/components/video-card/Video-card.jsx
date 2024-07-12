import { useRef, useState } from "react";
import styles from "./Video-card.module.css"
import ReactPlayer from "react-player";
import VideoModal from "../video-modal/Video-modal";
import timeDifferenceToString from "../../utils/timeDifferenceToString";



const VideoCard = ({
    videoUrl,
    thumbnail,
    title,
    viewCount,
    gameChoice,
    _id, likes, owner,created_at
}) => {
    const [playing, setPlaying] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const playerRef = useRef(null);



    return (



        <div className={styles["video-card"]}>
            <div className={styles["media"]}
                onClick={() => setShowModal(!showModal)}
                onMouseEnter={() => {
                    setPlaying(true);
                    playerRef.current.setState({ showPreview: false })
                }}
                onMouseLeave={() => { setPlaying(false) }}
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
                    url={`http://localhost:3000/data/${videoUrl}`}
                    width='100%'
                    height='100%'
                    light={
                        <img className={styles["thumbnail"]}
                            src={`http://localhost:3000/data/${thumbnail}`}
                            alt={thumbnail} />
                    }

                />

            </div>

            <div className={styles["video-info"]}>
                <div className={styles["owner-info"]}>
                <img src={owner.avatar} alt="" />
                <p>{owner.username}</p>
                </div>
                <h5>{title}</h5>

                <div className={styles["video-stats"]}>

                    <p><span>{viewCount}</span> views</p>
                    <p>{timeDifferenceToString(created_at)} ago</p>
                    <div className={styles["game-choice"]}>
                        <img src={`gamesIcons/${gameChoice}.png`} alt="" />
                        <p> {gameChoice}
                        </p>
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
            }} />}
        </div>
    )
}


export default VideoCard;