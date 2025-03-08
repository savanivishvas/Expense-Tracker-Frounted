import { Link } from "react-router-dom"
import "../../assets/css/adminnavbar.css"

export const AdminNavbar = () => {
  return (
    <div>
        <nav className="navbar">
            <div>
                <Link to="/" className="logo">Expense Tracker</Link>
            </div>
            <div>
                <ul className="nav-list">
                    <li>
                        <Link to="/admin/adminlogin">Login</Link>
                    </li>
                    <li>
                        <Link to="/admin/adminsignup">Signup</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}
