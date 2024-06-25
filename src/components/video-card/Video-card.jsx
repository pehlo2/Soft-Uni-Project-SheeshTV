import { useRef, useState } from "react";
import styles from "./Video-card.module.css"
import ReactPlayer from "react-player";
import VideoModal from "../video-modal/Video-modal";



const VideoCard = ({
    videoUrl,
    thumbnail,
    title,
    viewCount,
    gameChoice,
    _id,likes,owner
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
                <p>pehlo2</p>
                <h3>{title}</h3>

                <div className={styles["video-stats"]}>

                    <p>{viewCount}</p>
                    <p>{gameChoice}</p>
                </div>
            </div>

            {showModal && <VideoModal onClose={() => setShowModal(false)} videoId={_id} videoData={{
                videoUrl,
                thumbnail,
                title,
                viewCount,
                gameChoice,
                _id,likes,owner
            }} />}
        </div>
    )
}


export default VideoCard;