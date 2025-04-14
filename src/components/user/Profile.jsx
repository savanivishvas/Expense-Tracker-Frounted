import { useEffect, useState } from "react";
import "../../assets/css/profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Profile = () => {
  const [userdata, setuserdata] = useState({ fullName: "", email: "" });
  const [profileimg,setprofileimg] = useState("/images/men-1.png");
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const res = await axios.get(`/user/users/${localStorage.getItem("id")}`);
      setuserdata(res.data.data || { fullName: "", email: "" });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const handleInput = (e) => {
    setuserdata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = async () => {
    try {
      const res = await axios.patch(`/user/updateuser/${localStorage.getItem("id")}`, {
        fullName: userdata.fullName,
        email: userdata.email,
      });
      if(res.status === 200){
        toast.success("user update successfully")
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setprofileimg(event.target.result); // Update image preview
      };
      reader.readAsDataURL(file); // Convert file to base64 URL
    }
  }


  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="profile-container">
      <div className="inside-profile">

        <div className="profile-content">
          <div className="profile-img">
            <img src={profileimg} alt="User Avatar" className="profile-avatar" />
            <input type="file" accept="image/*" onChange={handleProfileImage}/>
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  name="fullName"
                  value={userdata.fullName} 
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="profile-field">
              <div>
                <label>Email: </label>
                <input
                  type="text"
                  name="email"
                  value={userdata.email} 
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="profile-actions">
              <button onClick={handleEdit}>Edit</button>
            </div>
            <div className="back-action">
              <button className="back-btn" onClick={() => navigate("/user/settings")}>Back</button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};
