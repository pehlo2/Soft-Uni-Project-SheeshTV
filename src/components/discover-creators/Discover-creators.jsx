import { useContext, useEffect, useState } from "react";
import CreatorCard from "../creator-card/Creator-card";
import * as userService from "../../services/userServices"
import styles from "./Discover-creators.module.css"
import SearchBarForUsers from "../search-bar-discover-users/Search-bar-users";
import ErrorContext from "../../context/errorContext";
import AuthContext from "../../context/authContext";


const DiscoverCreators = () => {


    const [creators, setCreators] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const { handleError } = useContext(ErrorContext)
    const {  userId } = useContext(AuthContext)
    useEffect(() => {

        userService.getAllNotFollowedUser(searchValue).then(setCreators).catch(error => {
            handleError(error.message);

        })

    }, [searchValue, userId])

    const onSearch = (searchValue) => {
        setSearchValue(searchValue)
    }

        console.log(userId);
        
    return (
        <div className={styles["container"]}>
            <SearchBarForUsers onSearch={onSearch} />
            <div className={styles["creators"]}>

                {creators.map(creator => (<CreatorCard key={creator._id} creator={creator}></CreatorCard>))}
            </div>

        </div>

    )
};

export default DiscoverCreators;