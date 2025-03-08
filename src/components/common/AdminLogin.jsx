/* eslint-disable react/no-unknown-property */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/login.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminLogin = () => {

  const {register, handleSubmit,formState:{errors}} = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    
    const res = await axios.post("/admin/adminlogin",data);

    if(res.status === 200){
      toast.success("loginsuccessfull....");
      localStorage.setItem("id",res.data.data._id);
      localStorage.setItem("role",res.data.data.roleId.name);
      navigate("/admin");
    }
    else{
      console.log("Login failed ....");
    }
  }

  const validationSchema = {
    emailValidator:{
      required:{
        value:true,
        message:"email is required*"
      },
      pattern:{
        value:/[a-zA-Z0-9]+@[a-zA-z]+\.[a-zA-Z]{2,}/,
        message:"email is not valid*"
      }
    },
    passwordValidator:{
      required:{
        value:true,
        message:"password is required*"
      },
      pattern:{
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[./$%@])[a-zA-Z0-9./$%@]{8}$/,
        message:"password is not valid*"
      }
    }
  }

  return (
    <>
      <div className="login-background">
        <div class="login-section">
          <form onSubmit={handleSubmit(submitHandler)}>
            <h1>Admin Login</h1>
            <div class="login-details">
              <div class="row">
                <input type="email" placeholder="Enter Email" {...register("email", validationSchema.emailValidator)}/>
                <span>{errors.email?.message}</span>
              </div>
              <div class="row">
                <input type="password" placeholder="Enter Password" {...register("password", validationSchema.passwordValidator)}/>
                <span>{errors.password?.message}</span>
              </div>
              <div class="fp">
                <span>Forgot Password?</span>
              </div>
              <div class="submit-btn">
                <input type="submit" value="Login"/>
              </div>
              <div class="info">
                <span>
                  {`Don't have an account?`}
                  <Link to="/admin/adminsignup">sign up</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
