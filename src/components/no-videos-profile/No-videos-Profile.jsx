import styles from './No-videos-Profile.module.css'
export const NovideoProfile = () => {




    return (

        <div className={styles["no-video"]}>

            <h1>NO VIDEOS</h1>
            <div className={styles["no-videos-wrapper"]}>
                <div className={styles["find-friends-box"]}>
                    <i className={styles["fa-solid fa-user-plus"]}></i>
                    <h3>Find your friends</h3>
                    <p>Invite friends to SheeshTv and start connecting</p>
                    <button>Share</button>
                </div>
                <div className={styles["share-video-box"]}>

                    <i className={styles["fa-solid fa-file-pen"]}></i>
                    <h3>Start Sharing</h3>
                    <p>
                        Play a game and clip a moment to share with your friends</p>
                    <button>Follow</button>
                </div>

            </div>
        </div>
    )
}

