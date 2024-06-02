 import AsideFollowers from '../aside-followers/Aside-followers';
import styles from './Profile-main.module.css'
 import Video from './video/Video';



const ProfileMain = () => {


    return (
        <main className={styles["main-profile"]}>
            <div className={styles["video-box"]}>
                <h1>Whatching Pehlo latest Clips</h1>
               <Video/>
               <Video/>
            </div>
               <AsideFollowers/>
        </main>
    )
}


export default ProfileMain;