import { AdminNavbar } from "./AdminNavbar"
import "../../assets/css/adminsidebar.css"
import { Link, Outlet } from "react-router-dom"

export const AdminSidebar = () => {
  return (
    <> 
      <AdminNavbar />
      <div className="admin-sidebar">
        <div className="left-admin-sidebar">
        <div className="admin-feature">
            <ul className="feature-ul">
              <li className="feature-list">
                  <Link to="/admin/dashboard" className="feature-link">
                    <img src="/images/dashboard.png" alt="dashboard-img" className="feature-icon"/>
                    Dashboard
                  </Link>
              </li>
              <li className="feature-list">
                  <Link to="/admin/category" className="feature-link">
                    <img src="/images/category.png" alt="dashboard-img" className="feature-icon"/>
                    Category
                  </Link>
              </li>
            </ul>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  )
}
