import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const UserLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const submitHandler = async (data) => {
    const res = await axios.post("/user/userlogin", data);
    if (res.status === 200) {
      toast.success("Login successful!");
      localStorage.setItem("id", res.data.data._id);
      localStorage.setItem("role", res.data.data.roleId.name);
      navigate("/user/dashboard");
    } else {
      toast.error("Login Failed.");
    }
  };

  // Forgot password handler
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset password.");
      return;
    }

    try {
      const res = await axios.post("/user/forgotpassword", { email });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to send reset link.");
    }
  };

  return (
    <div className="login-background">
      <div className="login-section">
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1>User Login</h1>
          <div className="login-details">
            <div className="row">
              <input type="email" placeholder="Enter Email"
                {...register("email", { required: "Email is required" })}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>{errors.email?.message}</span>
            </div>
            <div className="row">
              <input type="password" placeholder="Enter Password"
                {...register("password", { required: "Password is required" })}
              />
              <span>{errors.password?.message}</span>
            </div>
            <div className="fp">
              <span onClick={handleForgotPassword} style={{ cursor: "pointer"}}>
                Forgot Password?
              </span>
            </div>
            <div className="submit-btn">
              <input type="submit" value="Login" />
            </div>
            <div className="info">
              <span>
                {`Don't have an account?`}
                <Link to="/user/usersignup">sign up</Link>
              </span>
          </div>
          </div>
        </form>

      </div>
    </div>
  );
};
