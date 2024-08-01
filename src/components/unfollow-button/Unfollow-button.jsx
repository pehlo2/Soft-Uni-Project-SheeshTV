import styles from './Unfollow-button.module.css'
import * as usersServices from '../../services/userServices'
import ErrorContext from '../../context/errorContext'
import { useContext } from 'react'

const UnFollowButton = ({ userToUnfollowId, onUnfollow }) => {
    const { handleError } = useContext(ErrorContext)
    const unFollowUserHandler = async (e) => {
        e.preventDefault()
        await usersServices.unFollowUser(userToUnfollowId).catch(error => {
            handleError(error.message);
        })
        if (onUnfollow) {
            onUnfollow(userToUnfollowId)
        }

    }

    return (
        <button className={styles["unfollow-button"]} onClick={unFollowUserHandler}>Unfollow</button>
    )
}

export default UnFollowButton;