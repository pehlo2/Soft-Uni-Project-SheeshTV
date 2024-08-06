import { Link, useParams } from 'react-router-dom'
import styles from './No-videos-Profile.module.css'
import { useContext } from 'react'
import AuthContext from '../../context/authContext'
export const NovideoProfile = () => {

    const { userId } = useContext(AuthContext)
    const { profileId } = useParams()

    return (

        <div className={styles["no-video"]}>

            <h1>Oof, no more clips here...</h1>
            {userId === profileId && (
                <div className={styles["no-videos-wrapper"]}>
                    <div className={styles["find-friends-box"]}>
                        <i className={styles["fa-solid fa-user-plus"]}></i>
                        <h3>Find friends</h3>
                        <p>Invite friends to SheeshTv and start connecting</p>
                        <Link>Find friends</Link>
                    </div>
                    <div className={styles["share-video-box"]}>

                        <i className={styles["fa-solid fa-file-pen"]}></i>
                        <h3>Find Highligths</h3>
                        <p>
                            Watch a clip and to share with your friends</p>
                        <Link to={'/dashboard'}>Watch Clips</Link>
                    </div>


                </div>

            )}
            {userId !== profileId && (
                <div className={styles["no-videos-wrapper"]}>
                    <div className={styles["find-friends-box"]}>
                        <i className={styles["fa-solid fa-user-plus"]}></i>
                        <h3>Find your friends</h3>
                        <p>Invite friends to SheeshTv and start connecting</p>
                        <Link>Find friens</Link>
                    </div>
                    <div className={styles["share-video-box"]}>

                        <i className={styles["fa-solid fa-file-pen"]}></i>
                        <h3>Find Highligths</h3>
                        <p>
                            Play a game and clip a moment to share with your friends</p>
                        <Link>Share</Link>
                    </div>


                </div>

            )}


        </div>
    )
}

