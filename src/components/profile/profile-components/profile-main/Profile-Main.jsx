 import { useContext } from 'react';
import AsideFollowers from '../aside-followers/Aside-followers';
import styles from './Profile-main.module.css'
 import Video from './video/Video';
import ProfileVideoContext from '../../../../context/videoContext';



const ProfileMain = () => {
      const { videos } = useContext(ProfileVideoContext)

    

    return (

        <main className={styles["main-profile"]}>
            <div className={styles["video-box"]}>
                <h1>Whatching Pehlo latest Clips</h1>
              {videos.map(video=> <Video  key={video._id} video={video} />)}
            </div>
               <AsideFollowers/>
        </main>
    )
} 


export default ProfileMain;