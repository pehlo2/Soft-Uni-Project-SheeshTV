import styles from './Video-modal.module.css'
import Comments from '../profile/profile-components/profile-main/comments/Coments';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';


const VideoModal = ({
    onClose
}) => {
    return (
        <div className={styles["blur"]}>
            <div className={styles["container"]} onClick={onClose} >
                <video width="100%" height="100%" controls className={styles["video"]}>
                    <source src="./video/into-page.mp4" type="video/mp4" />
                    <source src="movie.ogg" type="video/ogg" />
                    Your browser does not support the video tag.
                </video>

                <aside className={styles["aside-section"]}>
                    <div className={styles["aside-inner"]}>
                        <div className={styles["aside-info"]}>
                            <div className={styles["profile-tab"]}>
                                <div className={styles["profile-info"]}>
                                    <div className={styles["profile-media"]}>
                                        <img src="/images/8.jpg" alt="" />
                                    </div>
                                    <div>
                                        <h4>Pehlo</h4>
                                        <p>Playing League</p>
                                    </div>

                                </div>
                                <a href="">Follow</a>
                            </div>
                            <div className={styles["video-info"]}>
                                <h3>Headshot Machine</h3>
                                <p>Descripsion: wafwafuawbiuawbfawi ufbawiufawiuwa iubfawi ubfawiubf awiuf bawiuf bawifubaw</p>
                            </div>
                            <div className={styles["social-tab"]}>
                                <a href=""><FontAwesomeIcon icon={faHeart}/></a>
                                <a href=""><FontAwesomeIcon icon={faComment}/></a>
                                <a href=""><FontAwesomeIcon icon={faLink}/></a>
                            </div>
                        </div>

                        <div className={styles["comments"]}>
                            <div className="user-comment">
                                <h4>Pehlo</h4>
                                <p>commets :Ebalo si maikata bahti proto</p>
                                <p>2min ago</p>
                            </div>
                            <div className="user-comment">
                                <h4>Pehlo</h4>
                                <p>commets :Ebalo si maikata bahti proto</p>
                                <p>2min ago</p>
                            </div>
                            <div className="user-comment">
                                <h4>Pehlo</h4>
                                <p>commets :Ebalo si maikata bahti proto</p>
                                <p>2min ago</p>
                            </div>
                        
                            <div className="user-comment">
                                <h4>Pehlo</h4>
                                <p>commets :Ebalo si maikata bahti proto</p>
                                <p>2min ago</p>
                            </div>
                        


                        </div>
                    </div>
                    < Comments />
                </aside>

            </div>
        </div>
    )
}

export default VideoModal;