import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Like-share-tab.module.css'
import { faComment, faHeart, faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'

import AuthContext from '../../context/authContext'
import { copyVideoLink } from '../../utils/copyVideoLink'
import VideoContext from '../../context/videoContext'
import UserVideosContext from '../../context/userVideoContext'
import Popup from '../pop-up/Pop-up'

const LikeShareTab = ({ video, isLiked, setIsLiked, contextType }) => {
    const { userId } = useContext(AuthContext)
    const context = useContext(contextType === 'userVideos' ? UserVideosContext : VideoContext)

    const { likeVideo, dislikeVideo } = context

    const [showPopup, setShowPopup] = useState(false);

    const handleLike = () => {
        likeVideo(video._id, userId)
        setIsLiked(true)
    }

    const handleDisLike = () => {
        dislikeVideo(video._id, userId)
        setIsLiked(false)
    }

    const handleCopyLink = () => {
        copyVideoLink(video._id);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 1500);
    };



    return (
        <div className={styles["social-tab"]}>
            {!isLiked && (<a><FontAwesomeIcon icon={faHeart} onClick={handleLike} className={`${styles["liked"]} ${!userId ? styles["disabled"] : ""}`}/></a>)}
            
            {isLiked && (<a className={styles["liked"]}><FontAwesomeIcon icon={faHeart} onClick={handleDisLike} className={`${styles["liked"]} ${!userId ? styles["disabled"] : ""}`} /></a>)}
            
            <a><FontAwesomeIcon icon={faComment} /></a>
            <a className={styles["copy-link"]}><Popup isVisible={showPopup} /><FontAwesomeIcon icon={faShareNodes} onClick={handleCopyLink} /></a>
        </div>
    )
}

export default LikeShareTab
