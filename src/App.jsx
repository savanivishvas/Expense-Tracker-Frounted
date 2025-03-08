import { Route, Routes } from "react-router-dom";
import { UserSidebar } from "./components/layout/UserSidebar";
import { UserLogin } from "./components/common/UserLogin";
import { UserSignup } from "./components/common/UserSignup";
import { AdminLogin } from "./components/common/AdminLogin";
import { AdminSignup } from "./components/common/AdminSignup";
import { AdminSidebar } from "./components/layout/AdminSidebar";
import axios from "axios";
import { UserProfile } from "./components/user/UserProfile";
import "./app.css";

export const App = () => {
  
  axios.defaults.baseURL = "http://localhost:5000";
  return (
    <div>
      <Routes>
        <Route path="/user/userlogin" element={<UserLogin />} />
        <Route path="/user/usersignup" element={<UserSignup />} />
        <Route path="/user" element={<UserSidebar />}>
          <Route path="profile" element={<UserProfile />} />
        </Route>
        
        <Route path="/admin/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/adminsignup" element={<AdminSignup />} />
        <Route path="/admin" element={<AdminSidebar />} >
        </Route>
      </Routes>
    </div>
  )
}
