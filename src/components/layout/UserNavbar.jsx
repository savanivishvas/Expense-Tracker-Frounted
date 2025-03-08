import { Link } from "react-router-dom"
import "../../assets/css/usernavbar.css"

export const UserNavbar = () => {
  return (
    <div>
        <nav className="navbar">
            <div>
                <Link to="/" className="logo">Expense Tracker</Link>
            </div>
            <div>
                <ul className="nav-list">
                    <li>
                        <Link to="/user/userlogin">Login</Link>
                    </li>
                    <li>
                        <Link to="/user/usersignup">Signup</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}
