
import ProfileHeader from './profile-components/profile-header/Profile-header'
import ProfileMain from './profile-components/profile-main/Profile-Main';
import styles from './Profile-page.module.css'
import * as videoServices from '../../services/videoServices'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import ProfileVideoContext from '../../context/videoContext';
import { useParams } from 'react-router-dom';
import { UserVideosProvider } from '../../context/userVideoContext';


const Profile = () => {
    const { userId } = useContext(AuthContext)
    const { profileId} = useParams()

  
    return (
        <div className={styles["container"]}>
            <UserVideosProvider profileId={profileId} >

            <ProfileHeader></ProfileHeader>
            <ProfileMain/>


            </UserVideosProvider>
        </div>

    )
}


export default Profile;