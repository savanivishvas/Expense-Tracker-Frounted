import { Link } from "react-router-dom"
import "../../assets/css/usernavbar.css"
import { useEffect, useState } from "react";

export const UserNavbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(true);
    },[])

    const handleLogout = () => {
        localStorage.removeItem("id");    
        localStorage.removeItem("role");
        setIsLoggedIn(false);
    }

  return (
    <div>
        <nav className="navbar">
            <div>
                <Link to="/user/dashboard" className="logo">Expense Tracker</Link>
            </div>
            <div>
                <ul className="nav-list">
                    {
                        isLoggedIn === true ?
                        <li>
                            <Link to="/user/userlogin" onClick={handleLogout}>Logout</Link>
                        </li>
                        :
                        <> 
                           <li>
                                <Link to="/user/usersignup">Signup</Link>
                           </li>
                           <li>
                               <Link to="/user/userlogin">Login</Link>
                           </li>
                        </>
                    }
                   
                </ul>
            </div>
        </nav>
    </div>
  )
}
