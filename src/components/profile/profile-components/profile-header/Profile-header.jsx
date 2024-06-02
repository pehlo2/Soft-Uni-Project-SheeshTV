 import styles from  './Profile-header.module.css'
const ProfileHeader = () => {

    return (
        <header>
            <div className={styles["profile-wrapper"]}>
                <div className={styles["profile"]}>
                    <div className={styles["profile-main"]}>
                        <div className={styles["media"]}>
                            <img src="/images/8.jpg" alt="" />
                        </div>
                        <div className={styles["content"]}>
                            <h3>Pehlo</h3>
                            <p>Last Played Valorant 10 hours ago</p>
                            <p>Joined March 2023</p>
                            <div className={styles["buttons"]}>
                                <a href="">Follow</a>
                                <a href="" className={styles["message-button"]}>Message</a>
                            </div>

                        </div>
                    </div>
                    <div className={styles["profile-links"]}>
                        <a href="">Copy Profile link </a>
                    </div>
                </div>
                <div className={styles["profile-info"]}>

                    <div className={styles["profile-stats"]}>
                        <div className={styles["clips"]}>
                            <p>412</p>
                            <p>Clips</p>
                        </div>
                        <div className={styles["followers"]}>
                            <p>52</p>
                            <p>Followers</p>
                        </div>
                        <div className={styles["following"]}>
                            <p>52</p>
                            <p>Following</p>
                        </div>
                    </div>
                    <div className={styles["profile-description"]}>
                        <p> Ascendant Chamber main and always looking to friends to paly with.</p>
                    </div>
                </div>
            </div>
        </header>

    )


}

export default ProfileHeader