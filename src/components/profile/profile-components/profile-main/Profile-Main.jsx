import { useContext } from 'react';

import styles from './Profile-main.module.css'
import Video from '../../../video/Video';
import { NovideoProfile } from '../../../no-videos-profile/No-videos-Profile';
import UserVideosContext from '../../../../context/userVideoContext';
import LoaderSpinner from '../../../loader-spinner/Loader-spiner';
import AdvertisingPanel from '../advertising-panel/Advertising-panel';



const ProfileMain = ({ handleFollow, handleUnfollow }) => {
  const { videos, isLoading } = useContext(UserVideosContext)
  return (

    <main className={styles["main-profile"]}>
      <div className={styles["video-box"]}>
        <h1>Watching Profile latest Clips</h1>
        {videos.length === 0 && (<NovideoProfile />)}
        {videos.map(video => <Video key={video._id} video={video} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />)}
        {isLoading && <LoaderSpinner />}
      </div>
      <AdvertisingPanel />
    </main>
  )
}


export default ProfileMain;