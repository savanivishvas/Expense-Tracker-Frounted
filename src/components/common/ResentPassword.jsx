import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import "../../assets/css/resentpassword.css"

export const ResetPassword = () => {

    const token = useParams().token
    const {register,handleSubmit} = useForm();
    const navigate = useNavigate();

    const submitHandler = async(data)=>{
        //resetpasseord api..
        const obj = {
            token:token,
            password:data.password
        }
        const res = await axios.post("/user/resetpassword",obj)
        console.log(res.data)
        navigate("/user/userlogin");
    }

  return (
    <div className='reset-password-container'>
        <h1>Reset Password Component</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='new-password'>
                <label>NEW PASSWORD</label>
                <input type='password' {...register("password")}></input>
            </div>
            <div>
                <input type='submit' className='submit'></input>
            </div>
        </form>
    </div>
  )
}
