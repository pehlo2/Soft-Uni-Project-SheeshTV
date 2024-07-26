import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext";


export default function AlreadyAuthenticatedGuard(props) {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
}
