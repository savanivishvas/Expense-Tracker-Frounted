import { Route, Routes, useNavigate } from "react-router-dom";
import { UserSidebar } from "./components/layout/UserSidebar";
import { UserLogin } from "./components/common/UserLogin";
import { UserSignup } from "./components/common/UserSignup";
import { AdminLogin } from "./components/common/AdminLogin";
import { AdminSignup } from "./components/common/AdminSignup";
import { AdminSidebar } from "./components/layout/AdminSidebar";
import axios from "axios";
import "./app.css";
import PrivateRoutes from "./components/hooks/PrivateRoutes";
import { Dashboard } from "./components/user/Dashboard";
import { Income } from "./components/user/Income";
import { Expense } from "./components/user/Expense";
import { Report } from "./components/user/Report";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { ResetPassword } from "./components/common/ResentPassword";
import { Setting } from "./components/user/Setting";
import { Profile } from "./components/user/Profile";
import { Account } from "./components/user/Account";
import { useEffect } from "react";
import { Notification } from "./components/user/Notification";

export const App = () => {
  
  axios.defaults.baseURL = "http://localhost:5000";
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

      if (role === "USER") {
        navigate("/user/dashboard");
      }
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      }
    
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/user/userlogin" element={<UserLogin />} />
        <Route path="/user/usersignup" element={<UserSignup />} />
        <Route path="/admin/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/adminsignup" element={<AdminSignup />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        <Route path="/" element={<PrivateRoutes />} >
          <Route path="/user" element={<UserSidebar />}>
            <Route path="dashboard" element={<Dashboard />}/>
            <Route path="income" element={<Income />} />
            <Route path="expense" element={<Expense />} />
            <Route path="report" element={<Report />} />
            <Route path="settings" element={<Setting />} >
                <Route path="user-profile" element={<Profile />} />
                <Route path="user-account" element={<Account />} />
                <Route path="user-notification" element={<Notification />} />
            </Route>
          </Route>

          <Route path="/admin" element={<AdminSidebar />} >
             <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
        
      </Routes>
    </div>
  )
}
