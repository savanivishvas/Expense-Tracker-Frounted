import { useEffect, useState } from "react";
import "../../assets/css/admindashboard.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminDashboard = () => {

  const [showform, setshowform] = useState(false);
  const [admindata, setadmindata] = useState([]);
  const [editdata, seteditdata] = useState(null);
  const [search,setsearch] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } , reset } = useForm();

  // Create or Update Admin Data
  const submitHandler = async (data) => {
    if (editdata) {

      const res = await axios.patch(`/admin/updateadmin/${editdata._id}`, data);

      if (res.status === 200) {
        toast.success("Admin Updated Successfully!");
      } else {
        toast.error("Failed to Update Admin");
      }
    } else {
      // Add new admin data
      const res = await axios.post("/admin/addadmin", data);

      if (res.status === 201) {
        toast.success("Admin Added Successfully!");
      } else {
        toast.error("Failed to Add Admin");
      }
    }

    setshowform(false);
    getAllAdmin(); 
  };

  // Fetch All Admin Data
  const getAllAdmin = async () => {
    const res = await axios.get("/admin/admins");
    setadmindata(res.data.data);
  };

  useEffect(() => {
    getAllAdmin();
  }, []);

  // Delete Admin Data
  const deleteAdminData = async (id) => {
    const res = await axios.delete(`/admin/deleteadmin/${id}`);

    if (res.status === 200) {
      toast.success("Admin Deleted Successfully");
      getAllAdmin(); 
    } else {
      toast.error("Failed to Delete Admin");
    }
  };

  // Set Data for Editing
  const handleEdit = (admin) => {
    seteditdata(admin); 
    setshowform(true); 

    setValue("name", admin.name);
    setValue("email", admin.email);
  };

  const filteredAdmin = admindata.filter((admin) => {
    return `${admin.name}`.toLowerCase().includes(search.toLowerCase());
  })

  const validationSchema = {
    nameValidator: {
      required:{
        value:true,
        message:"name is required"
      },
      pattern: { 
        value: /[a-zA-Z]/, 
        message: "Invalid name" }
      ,
    },
    emailVaildatator:{
      required:{
        value:true,
        message:"email is required"
      },
      pattern:{
          value:/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,}$/,
          message:"email is not valid*"
      }
    },
    passwordVaildator:{
      required:{
          value:true,
          message:"password is required"
      },
      pattern:{
          value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[./$%@])[a-zA-Z0-9./$%@]{8}$/,
          message:"password in not valid*"
      }
    }
  };

  return (
    <>
      <div className="admin-container">
        <div className="inside-admin">

          {/* 1. Search and Add Button */}
          <div className="operation-admin">
            <div className="search-admin">
              <input 
                type="text" 
                placeholder="Search Admin..." 
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <div className="add-admin">
              <button onClick={() => { 
                seteditdata(null); 
                setshowform(true); 
                reset();
              }}>
                + Add Admin
              </button>
            </div>
          </div>

          {/* 2. Add / Edit Admin Form */}
          {showform && (
            <div className="modal">
              <div className="modal-content">
                <h3>{editdata ? "Update Admin" : "Add Admin"}</h3>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      {...register("name", validationSchema.nameValidator)}
                    />
                    <span>{errors.category?.message}</span>
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      {...register("email", validationSchema.emailVaildatator)}
                    />
                    <span>{errors.amount?.message}</span>
                  </div>

                  <div>
                    <label>Password</label>
                    <input
                      type="password"
                      {...register("password", validationSchema.passwordVaildator)}
                    />
                    <span>{errors.transactionDate?.message}</span>
                  </div>

                  <div className="modal-buttons">
                    <button type="submit">{editdata ? "Update Addmin" : "Add Addmin"}</button>
                    <button type="button" onClick={() => setshowform(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 3. Income List */}
          {/* <div className="admin-sources">
            <ul className="admin-ul">
              {
               filteredAdmin?.map((admin, index) => (
                  <li className="admin-list" key={index}>
                    <div className="admin-name">
                      <span>{admin.name}</span>
                    </div>
                    <div className="admin-email">
                      <span>{admin.email}</span>
                    </div>
                    <div className="income-action">
                      <i className="fa-regular fa-pen-to-square" onClick={() => handleEdit(admin)}></i>
                      <i className="fa-solid fa-trash" onClick={() => deleteAdminData(admin._id)}></i>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div> */}

          <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
        
            <tbody>
              {
                  filteredAdmin.map((curAdmin , index) => {
                      const { name, email} = curAdmin;
                      return (
                        <tr key={index}>
                          <td>{name}</td>
                          <td>{email}</td>
                          <td className="admin-action">
                            <i className="fa-regular fa-pen-to-square" onClick={() => handleEdit(curAdmin)}></i>
                            <i className="fa-solid fa-trash" onClick={() => deleteAdminData(curAdmin._id)}></i>
                          </td>
                        </tr>
                      )
                  })
              }
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
};
