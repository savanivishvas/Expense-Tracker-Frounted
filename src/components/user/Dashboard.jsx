import { PieChart } from "@mui/x-charts"
import "../../assets/css/userdashboard.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { FormatDate } from "../common/FormatDate"
import { FormatPrice } from "../common/FormatPrice"

export const Dashboard = () => {

  const [transactiondata,settransactiondata] = useState([]);
  const [dashboarddata,setdashboarddata] = useState([]);

  const getAllTransactions = async () => {
    const res = await axios.get("/transaction/recenttransactions");
    // console.log(res.data);
    settransactiondata(res.data.data);
  }

  const getBalance = async () => {
    const res = await axios.get("/balance/getbalance");
    setdashboarddata(res.data);
    // console.log(res.data);
  }

  useEffect(() => {
    getAllTransactions();
    getBalance();
  },[])

  return (
    <>
      <div className="dashboard-containar">
        <div className="inside-dashboard">

          {/* 1. cards row */}
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

          {/* 2. dashboard content */}
          <div className="dashboard-content">

            {/* 2.1 recent-transactions */}
            <div className="recent-transactions">
              <h3>Recent Transactions</h3>

              <ul className="transactions-ul">
                {
                  transactiondata?.map((transaction, index) => {
                    const isIncome = transaction.type === "income"; 
                    return (
                      <li className="transactions-list" key={index}>
                        <div className="transactions-left">
                          <img src={isIncome ? "/images/income.png" : "/images/expense.png"} alt="transaction" />
                          <div className="transactions-left-content">
                            <span>{transaction.category}</span>
                            <span>{FormatDate(transaction.transactionDate)}</span>
                          </div>
                        </div>
                        <div className="transactions-right">
                          <span style={{ color: isIncome ? "green" : "red" }}>
                            {isIncome ? `+ ${transaction.amount}` : `- ${transaction.amount}`}
                          </span>
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>

            {/* 2.2 financial-overview */}
            <div className="financial-overview">
              <h3>Financial Overview</h3>
              <PieChart
                className="financial-chart"
                series={[
                  {
                    data: [
                      { id: 0, value: dashboarddata?.balance , label: 'Balance' },
                      { id: 1, value: dashboarddata?.totalIncome , label: 'Income' },
                      { id: 2, value: dashboarddata?.totalExpense , label: 'Expense' },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
