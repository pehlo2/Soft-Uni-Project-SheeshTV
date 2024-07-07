import styles from './Follow-button.module.css'
import * as usersServices from '../../services/userServices'

const FollowButton = ({userToFollowId})=>{
    
    const followUserHandler = async(e)=>{
        e.preventDefault()
        await usersServices.followUser(userToFollowId)
    }
    
    return(
       <button className={styles["follow-button"]} onClick={followUserHandler}>Follow</button>
    )
}

export default FollowButton;