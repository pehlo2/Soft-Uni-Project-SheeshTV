import { useState } from "react";



const DiscoverCreators = () => {


    const [creators, setCreators] = useState([])



    return (
        <div className="container">
            {creators.map(creator => (creatorCard))}

        </div>

    )
};

export default DiscoverCreators;