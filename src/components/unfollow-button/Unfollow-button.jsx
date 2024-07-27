import styles from './Unfollow-button.module.css'
import * as usersServices from '../../services/userServices'

const UnFollowButton = ({ userToUnfollowId, onUnfollow }) => {

    const unFollowUserHandler = async (e) => {
        e.preventDefault()
        await usersServices.unFollowUser(userToUnfollowId)
        if(onUnfollow){
        onUnfollow(userToUnfollowId)}

    }

    return (
        <button className={styles["unfollow-button"]} onClick={unFollowUserHandler}>Unfollow</button>
    )
}

export default UnFollowButton;