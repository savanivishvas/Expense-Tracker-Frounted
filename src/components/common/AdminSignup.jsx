import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/signup.css";
import axios from "axios";
import { toast } from "react-toastify/unstyled";

/* eslint-disable react/no-unknown-property */
export const AdminSignup = () => {

  const { register, handleSubmit,formState:{errors}} = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
   
    data.roleId = "67c52c5a009970fa2249a4d0";
    const res =  await axios.post("/admin/adminsignup",data);
    console.log(res);
    
    if(res.status === 201){
      toast.success("signup successfull....");
      navigate("/admin/adminsignup");
    }
    else{
      console.log("User not added...");   
    }
  }

  const validationSchema = {
    nameValidator:{
      required:{
        value:true,
        message:"name is required*"
      },
      pattern:{
        value:/[a-zA-Z]/,
        message:"name is not valid*"
      }
    },
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
    <div className="signup-background">
      <div class="signup-section">
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1>Admin SignUp</h1>
          <div class="signup-details">
            <div class="row">
              <input type="text" placeholder="Enter Full Name" {...register("name", validationSchema.nameValidator)}/>
              <span>{errors.name?.message}</span>
            </div>
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
              <input type="submit" value="Sign Up"/>
            </div>
            <div class="or">
              <hr />
              <span>Or</span>
              <hr />
            </div>
            <div class="google">
              <button type="button" style={{backgroundColor:"white"}}>
                <img src="/images/google_icon.svg" alt="Google Icon" />
                Sign Up With Google
              </button>
            </div>
            <div class="info">
              <span>
                {`Already have an account?`}
                <Link to="/admin/adminlogin">Login</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
