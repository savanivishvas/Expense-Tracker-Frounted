import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/signup.css";
import axios from "axios";
import { toast } from "react-toastify";


export const UserSignup = () => {

  const { register, handleSubmit,formState:{errors}} = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {

    data.roleId = "67c52c68009970fa2249a4d2";
    const res = await axios.post("/user/usersignup",data);

    console.log(res.data.data) 
    // console.log(res.data) 
    if(res.status === 201){
      toast.success("Signup successfull....");
      navigate("/user/userlogin");
    }
    else{
      toast.error("signup unsuccessfull....");
    }
  }

  const validationSchema = {
    fullNameValidator:{
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
    },
    otpValidator:{
      required:{
        value:true,
        message:"password is required*"
      },
      pattern:{
        value: /^[0-9]{6}$/,
        message:"password is not valid*"
      }
    }
  }

  return (
    <div className="signup-background">
      <div className="signup-section">
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1>User SignUp</h1>
          <div className="signup-details">
            <div className="row">
              <input type="text" placeholder="Enter Full Name" {...register("fullName", validationSchema.fullNameValidator)}/>
              <span>{errors.fullName?.message}</span>
            </div>
            <div className="row">
              <input type="email" placeholder="Enter Email" {...register("email", validationSchema.emailValidator)}/>
              <span>{errors.email?.message}</span>
            </div>
            <div className="row">
              <input type="password" placeholder="Enter Password" {...register("password", validationSchema.passwordValidator)}/>
              <span>{errors.password?.message}</span>
            </div>
            {/* <div className="row">
              <input type="password" placeholder="Enter OTP" {...register("otp", validationSchema.otpValidator)}/>
              <span>{errors.otp?.message}</span>
            </div> */}
            <div className="fp">
              <span>Forgot Password?</span>
            </div>
            <div className="submit-btn">
              <input type="submit" value="Sign Up"/>
            </div>
            <div className="or">
              <hr />
              <span>Or</span>
              <hr />
            </div>
            <div className="google">
              <button type="button" style={{backgroundColor:"white"}}>
                <img src="/images/google_icon.svg" alt="Google Icon" />
                Sign Up With Google
              </button>
            </div>
            <div className="info">
              <span>
                {`Already have an account?`}
                <Link to="/user/userlogin">Login</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
