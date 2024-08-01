import styles from './Follow-button.module.css'
import * as usersServices from '../../services/userServices'
import ErrorContext from '../../context/errorContext'
import { useContext } from 'react'

const FollowButton = ({ userToFollowId, onFollow }) => {
    const { handleError } = useContext(ErrorContext)
    const followUserHandler = async (e) => {
        e.preventDefault()
        await usersServices.followUser(userToFollowId).catch(error => {
            handleError(error.message);

        })
        if (onFollow) {
            onFollow(userToFollowId);
        }
    }

    return (
        <button className={styles["follow-button"]} onClick={followUserHandler}>Follow</button>
    )
}

export default FollowButton;