import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/setting.css";

export const Setting = () => {
  const location = useLocation(); 

  return (
    <>
      <div className="settings-container">
        <div className="inside-settings-container">

          {
            location.pathname === "/user/settings" && 
            (
              <ul className="settings-ul">
                {/* Profile */}
                <li className="settings-list">
                  <Link to="/user/settings/user-profile" className="settings-link">
                    <div className="settings-icon">
                      <img src="/images/user.png" alt="Profile Icon" />
                      <span>Profile</span>
                    </div>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                </li>
  
                {/* Account */}
                <li className="settings-list">
                  <Link to="/user/settings/user-account" className="settings-link">
                    <div className="settings-icon">
                      <img src="/images/bank.png" alt="Account Icon" />
                      <span>Account</span>
                    </div>
                    <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                </li>
              </ul>
            )
          }

          <Outlet />
        </div>
      </div>
    </>
  );
};
