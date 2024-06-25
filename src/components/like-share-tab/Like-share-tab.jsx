import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Like-share-tab.module.css'
import { faComment, faHeart, faLink } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import * as videoServices from '../../services/videoServices'
import AuthContext from '../../context/authContext'
import VideoContext from '../../context/videoContext'




const LikeShareTab = ({ video, isLiked, setIsLiked }) => {
    const { userId } = useContext(AuthContext)

    const { likeVideo, dislikeVideo } = useContext(VideoContext)


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


            {!isLiked && (<a ><FontAwesomeIcon icon={faHeart} onClick={handleLike} /></a>)}
            {isLiked && (<a ><FontAwesomeIcon style={{ color: "red" }} icon={faHeart} onClick={handleDisLike} /></a>)}
            <a ><FontAwesomeIcon icon={faComment} /></a>
            <a ><FontAwesomeIcon icon={faLink} /></a>
        </div>

    )
}
export default LikeShareTab