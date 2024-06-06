import { useRef, useState } from "react";
import styles from "./Video-card.module.css"
import ReactPlayer from "react-player";



const VideoCard = ({
    video
}) => {
    const [playing, setPlaying] = useState(false)

    const playerRef = useRef(null);



    return (<div className={styles["video-card"]}>
        <div className={styles["media"]}
            onMouseEnter={() => {
                setPlaying(true);
                playerRef.current.setState({ showPreview: false })
            }}
            onMouseLeave={() => { setPlaying(false) }}
        >

            < ReactPlayer
                controls
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
                url={`http://localhost:3000/data/${video.videoUrl}`}
                width='100%'
                height='100%'
                light={
                    <img className={styles["thumbnail"]}
                        src={`http://localhost:3000/data/${video.thumbnail}`}
                        alt={video.thumbnail} />
                }
            />

            {/* <img src={`http://localhost:3000/data/${video.thumbnail}`} alt="" /> */}
        </div>
        <div className={styles["video-info"]}>
            <p>pehlo2</p>
            <h3>{video.title}</h3>

            <div className={styles["video-stats"]}>

                <p>{video.viewCount}</p>
                <p>{video.gameChoice}</p>
            </div>
        </div>

    </div>
    )
}


export default VideoCard;