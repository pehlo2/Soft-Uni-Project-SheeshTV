
import styles from './Aside-followers.module.css'

const AsideFollowers = () => {
    return (

         
        <aside className={styles["followers-aside"]}>
            <h2>Following</h2>
             <div className={styles["media"]}>
                <img src="/icons/orangeLogo.png" alt="" />
             </div>
             <div className={styles["media"]}>
                <img src="/icons/blueLogo.png" alt="" />
             </div>


        </aside>
    )
}

export default AsideFollowers;