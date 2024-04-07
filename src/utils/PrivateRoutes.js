import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = { 'token': true }
    let is_authenticated = localStorage.getItem("is_authenticated");
    auth.token = is_authenticated ? is_authenticated : false;
    console.log("Private Routes !!" + auth.token);
    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes