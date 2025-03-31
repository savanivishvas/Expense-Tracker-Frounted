import { useEffect, useState } from "react";
import "../../assets/css/income.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FormatDate } from "../common/FormatDate";

export const Income = () => {
  const [showform, setshowform] = useState(false);
  const [incomedata, setincomedata] = useState([]);
  const [editdata, seteditdata] = useState(null);
  const [search,setsearch] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } , reset } = useForm();

  // Create or Update Income Data
  const submitHandler = async (data) => {
    if (editdata) {

      const res = await axios.patch(`/income/updateincome/${editdata._id}`, data);

      if (res.status === 200) {
        toast.success("Income Updated Successfully!");
      } else {
        toast.error("Failed to Update Income");
      }
    } else {
      // Add new income data
      const res = await axios.post("/income/addincome", data);

      if (res.status === 201) {
        toast.success("Income Added Successfully!");
      } else {
        toast.error("Failed to Add Income");
      }
    }

    setshowform(false);
    getAllIncome(); 
  };

  // Fetch All Income Data
  const getAllIncome = async () => {
    const res = await axios.get("/income/getallincome");
    setincomedata(res.data.data);
  };

  useEffect(() => {
    getAllIncome();
  }, []);

  // Delete Income Data
  const deleteIncomeData = async (id) => {
    const res = await axios.delete(`/income/deleteincome/${id}`);

    if (res.status === 200) {
      toast.success("Income Deleted Successfully");
      getAllIncome(); 
    } else {
      toast.error("Failed to Delete Income");
    }
  };

  // Set Data for Editing
  const handleEdit = (income) => {
    seteditdata(income); 
    setshowform(true); 

    setValue("category", income.category);
    setValue("amount", income.amount);
    setValue("transactionDate", income.transactionDate);
  };

  const filteredIncome = incomedata.filter((income) => {
    return `${income.category}`.toLowerCase().includes(search.toLowerCase());
  })


  const validationSchema = {
    category: {
      required: "Category is required",
      pattern: { value: /[a-zA-Z0-9]/, message: "Invalid category" },
    },
    amount: {
      required: "Amount is required",
      pattern: { value: /[0-9]/, message: "Invalid amount" },
    },
    transactionDate: {
      required: "Transaction date is required",
    },
  };

  return (
    <>
      <div className="income-container">
        <div className="inside-income">

          {/* 1. Search and Add Button */}
          <div className="operation-income">
            <div className="search-income">
              <input 
                type="text" 
                placeholder="Search Income..." 
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <div className="add-income">
              <button onClick={() => { 
                seteditdata(null); 
                setshowform(true); 
                reset();
              }}>
                + Add Income
              </button>
            </div>
          </div>

          {/* 2. Add / Edit Income Form */}
          {showform && (
            <div className="modal">
              <div className="modal-content">
                <h3>{editdata ? "Update Income" : "Add Income"}</h3>
                <form onSubmit={handleSubmit(submitHandler)}>

                  <div>
                    <label>Category Name</label>
                    <input
                      type="text"
                      {...register("category", validationSchema.category)}
                    />
                    <span>{errors.category?.message}</span>
                  </div>

                  <div>
                    <label>Amount</label>
                    <input
                      type="number"
                      {...register("amount", validationSchema.amount)}
                    />
                    <span>{errors.amount?.message}</span>
                  </div>

                  <div>
                    <label>Transaction Date</label>
                    <input
                      type="date"
                      {...register("transactionDate", validationSchema.transactionDate)}
                    />
                    <span>{errors.transactionDate?.message}</span>
                  </div>

                  <div className="modal-buttons">
                    <button type="submit">{editdata ? "Update Income" : "Add Income"}</button>
                    <button type="button" onClick={() => setshowform(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 3. Income List */}
          <div className="income-sources">
            <ul className="income-ul">
              {
               filteredIncome?.map((income, index) => (
                  <li className="income-list" key={index}>
                    <div className="income-category">
                      <img src="/images/income.png" alt="income" />
                      <span>{income.category}</span>
                    </div>
                    <div className="income-transactiondata">
                      <span>{FormatDate(income.transactionDate)}</span>
                    </div>
                    <div className="income-amount">
                      <span>+ {income.amount}</span>
                    </div>
                    <div className="income-action">
                      <i className="fa-regular fa-pen-to-square" onClick={() => handleEdit(income)}></i>
                      <i className="fa-solid fa-trash" onClick={() => deleteIncomeData(income._id)}></i>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
