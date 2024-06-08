import { useContext, useEffect } from "react"
import * as userService from '../../services/userServices'
import AuthContext from "../../context/authContext"
import { useNavigate } from "react-router-dom"

export default function Logout() {
    const navigate = useNavigate()
    const { logoutHandler } = useContext(AuthContext)



    useEffect(() => {
        userService.logout()
            .then(() => {
                logoutHandler();
                navigate('/');

            }).catch((err) => {
                navigate('/');
                console.log(err);
            })


    }, [])

    return null
}