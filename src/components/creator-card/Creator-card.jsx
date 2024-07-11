import { useState } from "react";
import styles from  "./Creator-card.module.css"
import FollowButton from "../follow-button/Follow-button";
import UnFollowButton from "../unfollow-button/Unfollow-button";
import { Link } from "react-router-dom";


const CreatorCard = ({username,avatar,_id}) => {


    return (
        <div className={styles["creator-card"]} style={{ backgroundImage: `url(${avatar})` }}>
            <div className={styles["blur-background"]}>

            </div>
            <div className={styles["media"]}>
                <img src={avatar} alt={avatar} />
            </div>
            <div className={styles["content"]}>
                <Link to={`/users/${_id}`}><p>{username}</p></Link>
                < FollowButton userToFollowId={_id} />
                < UnFollowButton userToUnfollowId={_id} />
            </div>
        </div>

    )
};

export default CreatorCard;