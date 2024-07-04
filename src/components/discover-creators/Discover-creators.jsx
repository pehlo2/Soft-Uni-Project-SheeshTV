import { useEffect, useState } from "react";
import CreatorCard from "../creator-card/Creator-card";
import * as userService from "../../services/userServices"


const DiscoverCreators = () => {


    const [creators, setCreators] = useState([])
    useEffect(()=>{

        userService.getAllNotFollowedUser().then(setCreators)

    },[])


       
       console.log(creators);
     
    return (
        <div className="container">
            {creators.map(creator => (<CreatorCard key={creator._id} {...creator}></CreatorCard>))}

        </div>

    )
};

export default DiscoverCreators;