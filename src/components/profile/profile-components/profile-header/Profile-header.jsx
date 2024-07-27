import { useContext, useEffect, useState } from 'react'
import styles from './Profile-header.module.css'
import { useParams } from 'react-router-dom'
import * as userServices from '../../../../services/userServices'
import FollowButton from '../../../follow-button/Follow-button'
import UpdateProfileModal from '../../../update-profile/Update-profile'
import UserVideosContext from '../../../../context/userVideoContext'
import { copyProfileLink } from '../../../../utils/copyProfileLink'
import VideoCount from '../../../video-count/Video-count'

import timeDifferenceToString from '../../../../utils/timeDifferenceToString'
import AuthContext from '../../../../context/authContext'
import FollowingModal from '../../../following-modal/Following-modal'
import FollowersModal from '../../../followers-modal/Followers-modal'
import UnFollowButton from '../../../unfollow-button/Unfollow-button'




const ProfileHeader = () => {
    const [profile, setProfile] = useState({})
    const [showProfileEdit, setShowProfileEdit] = useState(false)
    const [showFollowingModal, setShowFollowingModal] = useState(false)
    const [showFollowersModal, setShowFollowersModal] = useState(false)
    const [followingCount, setFollowingCount] = useState(0);
    const { changeOwnerVideoAvatar } = useContext(UserVideosContext)
    const { profileId } = useParams()
    const { userId } = useContext(AuthContext)
    useEffect(() => {

        userServices.getUser(profileId).then(setProfile)

    }, [profileId])

    useEffect(() => {
        userServices.getFollowingUsers(profileId).then(profileData => {
            setFollowingCount(profileData.length)
        }
        );
    }, [profileId]);




    const handleUpdateProfile = async () => {
        await userServices.getUser(profileId).then(profile => {
            setProfile(profile),
                changeOwnerVideoAvatar(profile)

        })

    }
    const updateFollowingCount = (newCount) => {
        setFollowingCount(newCount);
    };

    const isUserIdInFollowers = profile.followers?.some(follower => follower._id === userId)



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
                            <p>Joined {timeDifferenceToString(profile.createdAt)}</p>



                            {userId !== profileId && (
                                <>
                                    {isUserIdInFollowers ? (
                                        <UnFollowButton userToUnfollowId={profile._id} />
                                    ) : (
                                        <FollowButton userToFollowId={profile._id} />
                                    )}
                                </>
                            )}

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
                        <div className={styles["followers"]} onClick={() => { setShowFollowersModal(true) }}>
                            <p>{profile.followers?.length}</p>
                            <p>Followers</p>
                        </div>
                        <div className={styles["following"]} onClick={() => { setShowFollowingModal(true) }}>
                            <p>{followingCount}</p>
                            <p>Following</p>

                        </div>
                    </div>
                    <div className={styles["profile-description"]}>
                        <p> {profile.description}</p>
                    </div>
                </div>
            </div>
            {showProfileEdit && <UpdateProfileModal profile={profile} closeEdit={() => setShowProfileEdit(false)} onUpdate={handleUpdateProfile} />}
            {showFollowingModal && <FollowingModal onClose={() => setShowFollowingModal(false)} profile={profile} updateFollowingCount={updateFollowingCount} />}
            {showFollowersModal && <FollowersModal onClose={() => setShowFollowersModal(false)} profile={profile} updateFollowingCount={updateFollowingCount} />}
        </header>

    )


}

export default ProfileHeader