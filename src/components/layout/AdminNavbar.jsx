import { Link } from "react-router-dom"
import "../../assets/css/adminnavbar.css"
import { useEffect, useState } from "react";

export const AdminNavbar = () => {

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
                <Link to="/admin/dashboard" className="logo">Expense Tracker</Link>
            </div>
            <div>
                <ul className="nav-list">
                    {
                        isLoggedIn === true ?
                        <li>
                            <Link to="/admin/adminlogin" onClick={handleLogout}>Logout</Link>
                        </li>
                        :
                        <>
                            <li>
                                <Link to="/admin/adminlogin">Login</Link>
                            </li>
                            <li>
                                <Link to="/admin/adminsignup">Signup</Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    </div>
  )
}
