import { useState } from "react";



const CreatorCard = ({username,avatar,_id}) => {


    return (
        <div className="creator-card">
            <div className="media">
                <img src={avatar} alt="" />
            </div>
            <div className="content">
                <p>{username}</p>
                <a href="">Follow</a>
            </div>
        </div>

    )
};

export default CreatorCard;