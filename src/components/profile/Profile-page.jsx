
import ProfileHeader from './profile-components/profile-header/Profile-header'
import ProfileMain from './profile-components/profile-main/Profile-Main';
import styles from './Profile-page.module.css'

import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import { useParams } from 'react-router-dom';
import { UserVideosProvider } from '../../context/userVideoContext';


const Profile = () => {
    const { userId } = useContext(AuthContext)
    const { profileId } = useParams()


    return (
        <div className={styles["container"]}>
            <UserVideosProvider profileId={profileId} >
                <ProfileHeader></ProfileHeader>
                <ProfileMain />
            </UserVideosProvider>
        </div>

    )
}


export default Profile;