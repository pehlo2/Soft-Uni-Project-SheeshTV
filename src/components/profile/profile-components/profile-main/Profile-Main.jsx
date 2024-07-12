import { useContext } from 'react';
import AsideFollowers from '../aside-followers/Aside-followers';
import styles from './Profile-main.module.css'
import Video from '../../../video/Video';
import AuthContext from '../../../../context/authContext';
import { NovideoProfile } from '../../../no-videos-profile/No-videos-Profile';
import { useParams } from 'react-router-dom';
import UserVideosContext from '../../../../context/userVideoContext';



const ProfileMain = () => {

  const { userId } = useContext(AuthContext)
  const  {profileId} = useParams()
  const { videos } = useContext(UserVideosContext)
  // const {
  //   videos,
  //   deleteVideo,
  // } = useVideoActions(profileId);


  return (

    <main className={styles["main-profile"]}>
      <div className={styles["video-box"]}>
        <h1>Whatching Pehlo latest Clips</h1>
        {videos.length === 0 && (<NovideoProfile />)}
        {videos.map(video => <Video key={video._id} video={video}  />)}
      </div>
      <AsideFollowers />
    </main>
  )
}


export default ProfileMain;