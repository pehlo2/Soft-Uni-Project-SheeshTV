
import styles from './Aside-followers.module.css'

const AsideFollowers = () => {
    return (

         
        <aside className={styles["followers-aside"]}>
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
                        <a href="">Remove</a>
                    </div>
                </div>
            </div>

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
                        <a href="">Remove</a>
                    </div>
                </div>
            </div>
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
                        <a href="">Remove</a>
                    </div>
                </div>
            </div>



        </aside>
    )
}

export default AsideFollowers;