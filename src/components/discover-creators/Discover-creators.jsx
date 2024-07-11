import { useEffect, useState } from "react";
import CreatorCard from "../creator-card/Creator-card";
import * as userService from "../../services/userServices"
import styles from "./Discover-creators.module.css"


const DiscoverCreators = () => {


    const [creators, setCreators] = useState([])
    useEffect(()=>{

        userService.getAllNotFollowedUser().then(setCreators)

    },[])



     
    return (
        <div className={styles["container"]}>
            {creators.map(creator => (<CreatorCard key={creator._id} {...creator}></CreatorCard>))}

        </div>

    )
};

export default DiscoverCreators;