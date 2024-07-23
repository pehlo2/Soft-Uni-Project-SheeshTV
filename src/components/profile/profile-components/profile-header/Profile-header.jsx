import { useContext, useEffect, useState } from 'react'
import styles from './Profile-header.module.css'
import { useParams } from 'react-router-dom'
import * as userServices from '../../../../services/userServices'
import FollowButton from '../../../follow-button/Follow-button'
import UpdateProfileModal from '../../../update-profile/Update-profile'
import UserVideosContext from '../../../../context/userVideoContext'
import { copyProfileLink } from '../../../../utils/copyProfileLink'
import VideoCount from '../../../video-count/Video-count'
import FollowersModal from '../../../follower-modal/Followers-modal'
import timeDifferenceToString from '../../../../utils/timeDifferenceToString'



const ProfileHeader = () => {
    const [profile, setProfile] = useState({})
    const [showProfileEdit, setShowProfileEdit] = useState(false)
    const [showFollowModal, setShowFollowModal] = useState(false)
    const { changeOwnerVideoAvatar } = useContext(UserVideosContext)
    const { profileId } = useParams()

    useEffect(() => {

        userServices.getUser(profileId).then(setProfile)

    }, [profileId])


    const handleUpdateProfile = async () => {
        await userServices.getUser(profileId).then(profile => {
            setProfile(profile),
                changeOwnerVideoAvatar(profile)

        })

    }


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
                            <p>{timeDifferenceToString(profile.createdAt)}</p>
                            <div className={styles["buttons"]}>
                                < FollowButton userToFollowId={profile._id} />
                            </div>

                        </div>
                    </div>
                    <div className={styles["profile-links"]}>
                        <button onClick={() => setShowProfileEdit(!showProfileEdit)} >EDIT PROFILE</button>
                        <a onClick={() => copyProfileLink(profile._id)}>Copy Profile link </a>
                    </div>
                </div>
                <div className={styles["profile-info"]}>

                    <div className={styles["profile-stats"]}>
                        <VideoCount userId={profileId} />
                        <div className={styles["followers"]} onClick={() => { setShowFollowModal(true) }}>
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
            {showProfileEdit && <UpdateProfileModal profile={profile} closeEdit={() => setShowProfileEdit(false)} onUpdate={handleUpdateProfile} />}
            {showFollowModal && <FollowersModal closeFollowersModal={() => setShowFollowModal(false)} />}
        </header>

    )


}

export default ProfileHeader