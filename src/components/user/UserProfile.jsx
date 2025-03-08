/* eslint-disable react/jsx-key */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form"

export const UserProfile = () => {

  const [categories, setcategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  
  const getAllCategories = async () => {
    const res = await axios.get("/category/getallcategories");
    // console.log(res.data);
    setcategories(res.data.data);
  }

  const getSubCategoryByCategoryId = async (id) => {

    const res = await axios.get("/subcategory/getsubcategorybycategory/"+id);
    // console.log(id);
    console.log(res.data);
    setsubcategories(res.data.data);
  }
  
  useEffect(() => {
    getAllCategories();
  },[])
  
  const { register, handleSubmit} = useForm();

  const submitHandler = async (data) => {
    console.log(data);
  }

  return (
    <div style={{textAlign:"center",marginTop:"1rem"}}>
      <h1>User Expense</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div style={{marginTop:"1rem"}}>
          <select 
            {...register("categoryId")} 
            onChange={(e) => getSubCategoryByCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {
              categories?.map((category) => {
                return (
                  <option value={category._id}>{category.title}</option>
                )
              })
            }
          </select>
        </div>
        <div style={{marginTop:"1rem"}}>
          <select>
            <option>Select Subcategory</option>
            {
              subcategories?.map((subcategory) => {
                return (
                  <option value={subcategory._id}>{subcategory.title}</option>
                )
              })
            }
          </select>
        </div>
      </form>
    </div>
  )
}
