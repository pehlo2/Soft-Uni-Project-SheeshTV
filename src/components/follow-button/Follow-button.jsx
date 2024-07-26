import styles from './Follow-button.module.css'
import * as usersServices from '../../services/userServices'

const FollowButton = ({ userToFollowId ,onFollow}) => {

    const followUserHandler = async (e) => {
        e.preventDefault()
        await usersServices.followUser(userToFollowId)
        onFollow(userToFollowId); 
    }

    return (
        <button className={styles["follow-button"]} onClick={followUserHandler}>Follow</button>
    )
}

export default FollowButton;