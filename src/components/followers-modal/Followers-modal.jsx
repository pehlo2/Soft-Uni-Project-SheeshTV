import { useContext, useEffect, useState } from 'react';
import styles from './Followers-modal.module.css';
import * as userServices from '../../services/userServices';
import { Link, useParams } from 'react-router-dom';
import UnFollowButton from '../unfollow-button/Unfollow-button';
import AuthContext from '../../context/authContext';
import CloseModalButton from '../close-modal-button/Close-modal-button';
import FollowButton from '../follow-button/Follow-button';
import ErrorContext from '../../context/errorContext';

const FollowersModal = ({ onClose, updateFollowingCount }) => {
    const { userId } = useContext(AuthContext);
    const { profileId } = useParams();
    const [followers, setFollowers] = useState([]);
    const { handleError } = useContext(ErrorContext)


    useEffect(() => {

        userServices.getUser(profileId).then(user => setFollowers(user.followers)).catch(error => {
            handleError(error.message);
           
        });

    }, [profileId])

    const handleUnfollow = (userToUnFollow) => {
        setFollowers(prevUsers => prevUsers.map(user => {
            if (user._id === userToUnFollow) {
                const updatedFollowers = user.followers.filter(followerId => followerId !== userId);

                return {
                    ...user,
                    followers: updatedFollowers
                };
            }
            return user;
        }));
        updateFollowingCount(state => state - 1);
    }

    const handleFollow = (userIdToFollow) => {
        setFollowers(prevUsers => prevUsers.map(user => {
            if (user._id === userIdToFollow) {
                return {
                    ...user,
                    followers: [...user.followers, userId]
                };
            }
            return user;
        }));
        updateFollowingCount(state => state + 1);
    }






    return (
        <div className={styles.blur} onClick={onClose}>
            <div className={styles['followers-container']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['title-follow']}>
                    <h2>Followers</h2>
                </div>
                <div className={styles['followers-wrapper']}>

                    {followers.length === 0 && (

                        <h4> No followers</h4>
                    )}
                    {followers.map(user => (
                        <div className={styles['followers-box']} key={user._id}>
                            <div className={styles['followers-box-inner']}>
                                <div className={styles['followers-media']}>
                                    <img src={`http://localhost:3000/users/${user.avatar}`} alt={user.username} />
                                </div>
                                <div className={styles['followers-info']}>
                                    <Link to={`/users/${user._id}`} onClick={onClose}>
                                        <p>{user.username}</p>
                                    </Link>
                                </div>
                            </div>
                            {user._id !== userId && (
                                <>
                                    {!user.followers.includes(userId) && (
                                        <FollowButton userToFollowId={user._id} onFollow={handleFollow} />
                                    )}
                                    {user.followers.includes(userId) && (
                                        <UnFollowButton userToUnfollowId={user._id} onUnfollow={handleUnfollow} />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <CloseModalButton onClose={onClose} />
            </div>
        </div>
    );

};

export default FollowersModal;
