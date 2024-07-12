import { useContext, useEffect, useState } from 'react'
import styles from './Profile-header.module.css'
import { useParams } from 'react-router-dom'
import * as userServices from '../../../../services/userServices'
import FollowButton from '../../../follow-button/Follow-button'
import UpdateProfileModal from '../../../update-profile/Update-profile'
import UserVideosContext from '../../../../context/userVideoContext'
const ProfileHeader = () => {
    const [profile, setProfile] = useState({})
    const [showProfileEdit,setShowProfileEdit] =useState(false)
    const {changeOwnerVideoAvatar} = useContext(UserVideosContext)

    const { profileId } = useParams()

    useEffect(() => {

        userServices.getUser(profileId).then(setProfile)

    }, [profileId])
 

    const handleUpdateProfile = async() => {
       await userServices.getUser(profileId).then(profile=>{
        setProfile(profile),
        changeOwnerVideoAvatar(profile)

       })
       
      }
      
      //TOO DO : SEND USERData to update profile
    return (
        <header>
            <div className={styles["profile-wrapper"]}>
                <div className={styles["profile"]}>
                    <div className={styles["profile-main"]}>
                        <div className={styles["media"]}>
                            <img src={profile.avatar} alt="" />
                        </div>
                        <div className={styles["content"]}>
                            <h3>{profile.username}</h3>
                            <p>Last Played Valorant 10 hours ago</p>
                            <p>{profile.createdAt}</p>
                            <div className={styles["buttons"]}>
                           < FollowButton userToFollowId={profile._id}/>
                                <a href="" className={styles["message-button"]}>Message</a>
                            </div>

                        </div>
                    </div>
                    <div className={styles["profile-links"]}>
                        <button onClick={() => setShowProfileEdit(!showProfileEdit)} >EDIT PROFILE</button>
                        <a href="">Copy Profile link </a>
                    </div>
                </div>
                <div className={styles["profile-info"]}>

                    <div className={styles["profile-stats"]}>
                        <div className={styles["clips"]}>
                            <p>412</p>
                            <p>Videos</p>
                        </div>
                        <div className={styles["followers"]}>
                            <p>52</p>
                            <p>Followers</p>
                        </div>
                        <div className={styles["following"]}>
                            <p>52</p>
                            <p>Following</p>
                        </div>
                    </div>
                    <div className={styles["profile-description"]}>
                        <p> {profile.description}</p>
                    </div>
                </div>
            </div>
            {showProfileEdit && <UpdateProfileModal profile={profile} closeEdit={() => setShowProfileEdit(false)} onUpdate={handleUpdateProfile}/>}
        </header>

    )


}

export default ProfileHeader