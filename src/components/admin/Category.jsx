import { useEffect, useState } from "react";
import "../../assets/css/category.css";
import axios from "axios";
import { FormatDate } from "../common/FormatDate";

export const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryItems, setCategoryItems] = useState([]);
  const [expenseCategoryData, setExpenseCategoryData] = useState([]);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState("");
  const [expenseItems, setExpenseItems] = useState([]);

//   console.log(expenseCategoryData);
  

  // Get all unique categories
  const getAllCategories = async () => {
    const res = await axios.get(`/category/getallcategories`);
    setCategoryData(res.data.data);
  };

  // Get income data for selected category
  const fetchCategoryItems = async (category) => {
    const res = await axios.get(`/category/getbycategory/${category}`);
    setCategoryItems(res.data.data);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchCategoryItems(category);
  };

  //   ------------------------

  // Fetch all unique expense categories
  const getAllExpenseCategories = async () => {
    try {
      const res = await axios.get(`/category/getallexpensecategories`);
      setExpenseCategoryData(res.data.data);
    } catch (error) {
      console.error("Error fetching expense categories", error);
    }
  };

  // Fetch expenses by selected category
  const fetchExpenseItems = async (category) => {
    try {
      const res = await axios.get(`/category/getbyexpensecategory/${category}`);
      setExpenseItems(res.data.data);
    } catch (error) {
      console.error("Error fetching expense items", error);
    }
  };

  const handleExpenseCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedExpenseCategory(category);
    fetchExpenseItems(category);
  };

  useEffect(() => {
    getAllCategories();
    getAllExpenseCategories();
  }, []);

  return (
    <div className="category-container">
      <div className="inside-category">

        <div className="income-category">
            {/* Dropdown menu */}
            <h3>Category Wise Income Data</h3>
            <div className="category-dropdown">
              <select name="category" onChange={handleCategoryChange}>
                <option value="">Select Income Category</option>
                {
                  categoryData.map((category, index) => (
                    <option value={category} key={index}>{category}</option>
                  ))
                }
              </select>
            </div>
    
            {/* Display category items */}
            <div className="category-list">
              {selectedCategory && (
                <>
                  <h3>Items in {selectedCategory} Category:</h3>
                  <ul>
                    {categoryItems.map((item, index) => (
                      <li key={index}>
                        <strong>Amount:</strong> {item.amount} | <strong>Date:</strong> <span>{FormatDate(item.transactionDate)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
        </div>

        <div className="expense-category">
          <h3>Category Wise Expense Data</h3>
          <div className="category-dropdown">
            <select name="expenseCategory" onChange={handleExpenseCategoryChange}>
              <option value="">Select Expense Category</option>
              {expenseCategoryData.map((category, index) => (
                <option value={category} key={index}>{category}</option>
              ))}
            </select>
          </div>

            <div className="category-list">
              {selectedExpenseCategory && (
                <>
                  <h3>Items in {selectedExpenseCategory} Expense Category:</h3>
                  <ul>
                    {expenseItems.map((item, index) => (
                      <li key={index}>
                        <strong>Amount:</strong> {item.amount} | <strong>Date:</strong> <span>{FormatDate(item.transactionDate)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
        </div>


      </div>
    </div>
  );
};
