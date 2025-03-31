import { UserNavbar } from "./UserNavbar"
import "../../assets/css/usersidebar.css"
import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export const UserSidebar = () => {

  const [userdata, setuserdata] = useState();

  const getUserData = async () => {
    const res = await axios.get(`/user/users/${localStorage.getItem("id")}`);
    setuserdata(res.data.data);
    // console.log(res.data.data);
  }

  useEffect(() => {
    getUserData();
  },[])

  
  return (
    <> 
      <UserNavbar />
      <div className="user-sidebar">
        <div className="left-user-sidebar">
          <div className="user-feature">
            <div className="userdata">
              <img src="/images/man-1.png" alt="" />
              <span>{userdata?.fullName}</span>
            </div>
            <ul className="feature-ul">
              <li className="feature-list">
                  <Link to="/user/dashboard" className="feature-link">
                    <img src="/images/dashboard.png" alt="dashboard-img" className="feature-icon"/>
                    Dashboard
                  </Link>
              </li>
              <li className="feature-list">
                  <Link to="/user/income" className="feature-link">
                    <img src="/images/income.png" alt="income-img" className="feature-icon"/>  
                    Income
                  </Link>
              </li>
              <li className="feature-list">
                  <Link to="/user/expense" className="feature-link">
                    <img src="/images/expense.png" alt="expense-img" className="feature-icon"/>
                    Expense
                  </Link>
              </li>
              <li className="feature-list">
                  <Link to="/user/report" className="feature-link">
                    <img src="/images/report.png" alt="report-img" className="feature-icon"/>
                    Report
                  </Link>
              </li>
              <li className="feature-list">
                  <Link to="/user/settings" className="feature-link">
                    <img src="/images/settings.png" alt="setting-img" className="feature-icon"/>
                    Settings
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
