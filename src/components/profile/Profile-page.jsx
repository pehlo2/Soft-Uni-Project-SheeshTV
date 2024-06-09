
import ProfileHeader from './profile-components/profile-header/Profile-header'
import ProfileMain from './profile-components/profile-main/Profile-Main';
import styles from './Profile-page.module.css'
import * as videoServices from '../../services/videoServices'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import ProfileVideoContext from '../../context/videoContext';


const Profile = () => {
    const { userId } = useContext(AuthContext)

    const [videos, setVideos] = useState([])

    useEffect(() => {
        videoServices.getUserVideos(userId).then(userVideos => {

            setVideos(userVideos)
        }
        )

    }, [userId])



    return (
        <ProfileVideoContext.Provider value={{videos}}>
            <div className={styles["container"]}>
                <ProfileHeader></ProfileHeader>
                <ProfileMain />
            </div>
        </ProfileVideoContext.Provider>
    )
}


export default Profile;