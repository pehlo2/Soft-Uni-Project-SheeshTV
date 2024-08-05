
import styles from './Advertising-panel.module.css'

const AdvertisingPanel = () => {
    return (



        <aside className={styles["followers-aside"]}>
            {localStorage.getItem('theme') === 'dark' && <div className={styles["media"]}>
                <img src="/icons/orangeLogo.png" alt="" />
            </div>}

            {localStorage.getItem('theme') === 'light' && <div className={styles["media"]}>
                <img src="/icons/blueLogo.png" alt="" />
            </div>}
        </aside>
    )
}

export default AdvertisingPanel;