import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {

    const [authState,setAuthState] = useState({isLoggedin : false,role: ""});
    const [loading,setLoding] = useState(true); 

    useEffect(() => {
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        if(id){
            setAuthState({isLoggedin : true, role});
        }

        setLoding(false);
        
    },[])

    return { ...authState , loading};
}

const PrivateRoutes = () =>{

    const auth = useAuth();

    if(auth.loading){
        return <h1>Loading .....</h1>
    }

    return auth.isLoggedin ? <Outlet /> : <Navigate to="/user/userlogin" />

}

export default PrivateRoutes;