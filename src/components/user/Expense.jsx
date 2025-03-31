import { useEffect, useState } from "react";
import "../../assets/css/expense.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FormatDate } from "../common/FormatDate";

export const Expense = () => {
  const [showform, setshowform] = useState(false);
  const [expensedata, setexpensedata] = useState([]);
  const [editdata, seteditdata] = useState(null);
  const [search,setsearch] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } , reset } = useForm();

  // Create or Update expense Data
  const submitHandler = async (data) => {
    if (editdata) {

      const res = await axios.patch(`/expense/updateexpense/${editdata._id}`, data);

      if (res.status === 200) {
        toast.success("Expense Updated Successfully!");
      } else {
        toast.error("Failed to Update Expense ");
      }
    } else {
      // Add new expense data
      const res = await axios.post("/expense/addexpense", data);

      if (res.status === 201) {
        toast.success("Expense Added Successfully!");
      } else {
        toast.error("Failed to Add Expense");
      }
    }

    setshowform(false);
    getAllExpense(); 
  };

  // Fetch All Income Data
  const getAllExpense = async () => {
    const res = await axios.get("/expense/getallexpense");
    setexpensedata(res.data.data);
  };

  useEffect(() => {
    getAllExpense();
  }, []);

  // Delete Expense Data
  const deleteIncomeData = async (id) => {
    const res = await axios.delete(`/expense/deleteexpense/${id}`);

    if (res.status === 200) {
      toast.success("Expense Deleted Successfully");
      getAllExpense(); 
    } else {
      toast.error("Failed to Delete Expense");
    }
  };

  // Set Data for Editing
  const handleEdit = (expense) => {
    seteditdata(expense); 
    setshowform(true); 

    setValue("category", expense.category);
    setValue("amount", expense.amount);
    setValue("transactionDate", expense.transactionDate);
  };

  const filteredExpense = expensedata.filter((expense) => {
    return `${expense.category}`.toLowerCase().includes(search.toLowerCase());
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
      <div className="expense-container">
        <div className="inside-expense">

          {/* 1. Search and Add Button */}
          <div className="operation-expense">
            <div className="search-expense">
              <input 
                type="text" 
                placeholder="Search Expense..." 
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <div className="add-expense">
              <button onClick={() => { 
                seteditdata(null); 
                setshowform(true); 
                reset();
              }}>
                + Add Expense
              </button>
            </div>
          </div>

          {/* 2. Add / Edit Expense Form */}
          {showform && (
            <div className="modal">
              <div className="modal-content">
                <h3>{editdata ? "Update Expense" : "Add Expense"}</h3>
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
                    <button type="submit">{editdata ? "Update Expense" : "Add Expense"}</button>
                    <button type="button" onClick={() => setshowform(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 3. Expense List */}
          <div className="expense-sources">
            <ul className="expense-ul">
              {
               filteredExpense?.map((expense, index) => (
                  <li className="expense-list" key={index}>
                    <div className="expense-category">
                      <img src="/images/expense.png" alt="expense" />
                      <span>{expense.category}</span>
                    </div>
                    <div className="expense-transactiondate">
                      <span>{FormatDate(expense.transactionDate)}</span>
                    </div>
                    <div className="expense-amount">
                      <span>+ {expense.amount}</span>
                    </div>
                    <div className="expense-action">
                      <i className="fa-regular fa-pen-to-square" onClick={() => handleEdit(expense)}></i>
                      <i className="fa-solid fa-trash" onClick={() => deleteIncomeData(expense._id)}></i>
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
