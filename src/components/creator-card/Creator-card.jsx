import { useContext, useState } from "react";
import styles from "./Creator-card.module.css";
import FollowButton from "../follow-button/Follow-button";
import UnFollowButton from "../unfollow-button/Unfollow-button";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";

const CreatorCard = ({ creator }) => {
    const { userId } = useContext(AuthContext);
    const avatarUrl = encodeURI(creator.avatar.replace(/\\/g, '/'));
    const [isLiked, setIsLiked] = useState(creator.followers?.includes(userId));

    const handleFollow = () => {
        setIsLiked(true);
    };

    const handleUnfollow = () => {
        setIsLiked(false);
    };

    return (
        <div className={styles["creator-card"]} style={{ backgroundImage: `url('${avatarUrl}')` }}>
            <div className={styles["blur-background"]}></div>
            <div className={styles["media"]}>
                <img src={creator.avatar} alt={creator.username} />
            </div>
            <div className={styles["content"]}>
                <Link to={`/users/${creator._id}`}>
                    <p>{creator.username}</p>
                </Link>
                {!isLiked ? (
                    <FollowButton userToFollowId={creator._id} onFollow={handleFollow} />
                ) : (
                    <UnFollowButton userToUnfollowId={creator._id} onUnfollow={handleUnfollow} />
                )}
            </div>
        </div>
    );
};


export default CreatorCard;
