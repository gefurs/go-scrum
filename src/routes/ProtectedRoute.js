import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const logged = localStorage.getItem("token");

    return (
        <>
            {!logged ? <Navigate to="/login" replace /> : children}
        </>
    );
}

export default ProtectedRoute;