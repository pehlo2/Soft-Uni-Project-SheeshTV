import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Like-share-tab.module.css'
import { faComment, faHeart, faLink } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

import AuthContext from '../../context/authContext'
import { copyVideoLink } from '../../utils/copyVideoLink'
import VideoContext from '../../context/videoContext'
import UserVideosContext from '../../context/userVideoContext'

const LikeShareTab = ({ video, isLiked, setIsLiked ,contextType}) => {
    const { userId } = useContext(AuthContext)
    const context = useContext(contextType === 'userVideos' ? UserVideosContext : VideoContext)

    const { likeVideo, dislikeVideo } = context

    const handleLike = () => {
        likeVideo(video._id, userId)
        setIsLiked(true)
    }

    const handleDisLike = () => {
        dislikeVideo(video._id, userId)
        setIsLiked(false)
    }

    return (
        <div className={styles["social-tab"]}>
            {!isLiked && (<a><FontAwesomeIcon icon={faHeart} onClick={handleLike} /></a>)}
            {isLiked && (<a><FontAwesomeIcon style={{ color: "red" }} icon={faHeart} onClick={handleDisLike} /></a>)}
            <a><FontAwesomeIcon icon={faComment} /></a>
            <a><FontAwesomeIcon icon={faLink} onClick={() => copyVideoLink(video._id)} /></a>
        </div>
    )
}

export default LikeShareTab
