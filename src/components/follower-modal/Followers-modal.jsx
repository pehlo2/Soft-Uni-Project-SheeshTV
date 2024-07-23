
import styles from './Followers-modal.module.css'

const FollowersModal = () => {

    return (
        <div className={styles["blur"]}>
            <div className={styles["followers-container"]}>
                <h2>Following</h2>
                <div className={styles["followers-wrapper"]}>
                    <div className={styles["followers-box"]}>
                        <div className={styles["followers-box-inner"]}>
                            <div className={styles["followers-media"]}>
                                <img src="/images/8.jpg" alt="" />
                            </div>
                            <div className={styles["followers-info"]}>
                                <p>Pehlo</p>
                                <p>2min ago</p>
                            </div>
                        </div>

                        <div className={styles["remove-button"]}>
                            <a href="">x</a>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    )
}

export default FollowersModal;