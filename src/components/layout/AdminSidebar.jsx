import { AdminNavbar } from "./AdminNavbar"
import "../../assets/css/adminsidebar.css"
import { Outlet } from "react-router-dom"

export const AdminSidebar = () => {
  return (
    <> 
      <AdminNavbar />
      <div className="admin-sidebar">
        <div className="left-admin-sidebar">
          <h1>UserSidebar</h1>
        </div>
        <div className="right-admin-sidebar">
          <h1>Welcome Admin Page</h1>
        </div>
      </div>
      <Outlet></Outlet>
    </>
  )
}
