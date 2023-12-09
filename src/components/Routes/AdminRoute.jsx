import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import Lottie from "lottie-react";
import lloading from '../../assets/others/loading.json';


const AdminRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <Lottie animationData={lloading} loop={true}></Lottie>
    }
    if (user && isAdmin) {
        return children
    }
    return (
        <Navigate to='/' state={location.pathname} replace>

        </Navigate >
    );
};

export default AdminRoute;