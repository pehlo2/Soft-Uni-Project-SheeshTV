import { useEffect, useState } from "react";
import CreatorCard from "../creator-card/Creator-card";
import * as userService from "../../services/userServices"
import styles from "./Discover-creators.module.css"
import SearchBarForUsers from "../search-bar-discover-users/Search-bar-users";


const DiscoverCreators = () => {


    const [creators, setCreators] = useState([])
    const [searchValue, setSearchValue] = useState('')


    useEffect(() => {

        userService.getAllNotFollowedUser(searchValue).then(setCreators)

    }, [searchValue])

    const onSearch = (searchValue) => {
        setSearchValue(searchValue)
    }
 
    return (
        <div className={styles["container"]}>
            <SearchBarForUsers onSearch={onSearch} />
            <div className={styles["creators"]}>

                {creators.map(creator => (<CreatorCard key={creator._id} {...creator}></CreatorCard>))}
            </div>

        </div>

    )
};

export default DiscoverCreators;