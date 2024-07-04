import { useState } from "react";
import styles from  "./Creator-card.module.css"


const CreatorCard = ({username,avatar,_id}) => {


    return (
        <div className={styles["creator-card"]}>
            <div className={styles["media"]}>
                <img src={avatar} alt={avatar} />
            </div>
            <div className={styles["content"]}>
                <p>{username}</p>
                <a href="">Follow</a>
            </div>
        </div>

    )
};

export default CreatorCard;