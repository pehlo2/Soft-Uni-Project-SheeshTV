import { useContext, useEffect, useState } from "react"
import UserVideosContext from "../../context/userVideoContext"
import ProfileHeader from "../profile/profile-components/profile-header/Profile-header"
import ProfileMain from "../profile/profile-components/profile-main/Profile-Main"
import * as userServices from '../../services/userServices'
import AuthContext from "../../context/authContext"
const ProfileWrapper = ({ profileId }) => {

    const [profile, setProfile] = useState({})
    const { followUser, unfollowUser } = useContext(UserVideosContext)
    const { userId } = useContext(AuthContext)
    useEffect(() => {
        userServices.getUser(profileId).then(setProfile)
    }, [profileId])


    const handleUpdateProfile = async () => {
        await userServices.getUser(profileId).then(profile => {
            setProfile(profile),
                changeOwnerVideoAvatar(profile)

        })

    }
    const handleFollow = () => {
        followUser(profile._id);
        setProfile(prevProfile => ({
            ...prevProfile,
            followers: [...prevProfile.followers, { _id: userId }]
        }));
    };

    const handleUnfollow = () => {
        unfollowUser(profile._id);
        setProfile(prevProfile => ({
            ...prevProfile,
            followers: prevProfile.followers.filter(follower => follower._id !== userId)
        }));
    };



    return (
        <>
            <ProfileHeader profile={profile} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
            <ProfileMain handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
        </>

    )
}

export default ProfileWrapper; 