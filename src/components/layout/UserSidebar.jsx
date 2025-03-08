import { UserNavbar } from "./UserNavbar"
import "../../assets/css/usersidebar.css"
import { Outlet } from "react-router-dom"

export const UserSidebar = () => {
  return (
    <> 
      <UserNavbar />
      <div className="user-sidebar">
        <div className="left-user-sidebar">
          <h1>UserSidebar</h1>
        </div>
        {/* <div className="right-user-sidebar"> */}
          {/* <h1>Welcome User Page</h1> */}
        {/* </div> */}
        <Outlet></Outlet>
      </div>
    </>
  )
}
