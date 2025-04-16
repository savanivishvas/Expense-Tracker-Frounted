import axios from "axios";
import "../../assets/css/admindashboard.css"
import { FormatPrice } from "../common/FormatPrice"
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";

export const AdminDashboard = () => {

  const [dashboarddata,setdashboarddata] = useState([]);
  const [allcategoryincome, setallcategoryincome] = useState([]);
  const [allcategoryexpense, setallcategoryexpense] = useState([]);
  const [topfiveincome, settopfiveincome] = useState([]);
  const [topfiveexpense, settopfiveexpense] = useState([]);


  const getBalance = async () => {
    const res = await axios.get("/balance/getbalance");
    setdashboarddata(res.data);
  }  

  const getAllIncomeByCategory = async () => {
    const res = await axios.get("/category/getallincomebycategory");
    setallcategoryincome(res.data.data);
    settopfiveincome(res.data.topincome);
  } 

  const getAllExpenseByCategory = async () => {
    const res = await axios.get("/category/getallexpensebycategory");
    setallcategoryexpense(res.data.data);
    settopfiveexpense(res.data.topexpense);
  }

  useEffect(() => {
    getBalance();
    getAllIncomeByCategory();
    getAllExpenseByCategory();
  },[])


  return (
    <div className="admin-container">
      <div  className="inside-admin">

        {/* 1st dashboard */}
        <div className="cards-row">
          <div className="card">
            <div className="card-img">
              <img src="/images/wallet.png" alt="wallet-img" />
            </div>
            <div className="card-text">
              <h2>Total Balance</h2>
              <p><FormatPrice amount={dashboarddata?.balance} /></p>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src="/images/income.png" alt="income-img" />
            </div>
            <div className="card-text"> 
              <h2>Total Income</h2>
              <p><FormatPrice amount={dashboarddata?.totalIncome} /></p>
            </div> 
          </div>
          <div className="card">
            <div className="card-img">
              <img src="/images/expense.png" alt="expense-img" />
            </div> 
            <div className="card-text">
              <h2>Total Expense</h2>
              <p><FormatPrice amount={dashboarddata?.totalExpense} /></p>
            </div>
          </div>
        </div>

        <div className="category-graph-container">

          <div className="income-category-chart">
            <h3>Category Wise Income Distribution</h3>
            <PieChart
              series={[
                {
                  data: topfiveincome.map((item, index) => ({
                    id: index,
                    value: item.totalAmount,
                    label: item.category
                  }))
                },
              ]}
              width={450}
              height={200}
            />
          </div>

          <div className="expense-category-chart">
            <h3>Category Wise Expense Distribution</h3>
            <PieChart
              series={[
                {
                  data: topfiveexpense.map((item, index) => ({
                    id: index,
                    value: item.totalAmount,
                    label: item.category
                  }))
                },
              ]}
              width={450}
              height={200}
            />
          </div>

        </div>

        {/* 3nd  */}
        <div className="category-summery-container">

          {/* Income Category Summary */}
          <div className="category-summary">
            <div className="summery-heading">
              <h3>Income by Category</h3>
              <h3>Total Amount</h3>
            </div>
            <ul>
              {allcategoryincome.map((item, index) => (
                <li key={index}>
                  <span className="category-name">{item.category}</span>
                  <span className="category-amount"><FormatPrice amount={item.totalAmount} /></span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Expense Category Summary */}
          <div className="category-summary">
            <div className="summery-heading">
              <h3>Expense by Category</h3>
              <h3>Total Amount</h3>
            </div>
            <ul>
              {allcategoryexpense.map((item, index) => (
                <li key={index}>
                  <span className="category-name">{item.category}</span>
                  <span className="category-amount"><FormatPrice amount={item.totalAmount} /></span>
                </li>
              ))}
            </ul>
          </div>
      
        </div>
    </div>
  </div>
  )
}