import axios from "axios";
import { useEffect, useState } from "react";
import { FormatPrice } from "../common/FormatPrice";
import { useNavigate } from "react-router-dom";
import "../../assets/css/account.css";

export const Account = () => {

  const [dashboarddata,setdashboarddata] = useState();
  const navigate = useNavigate();

  const getBalance = async () => {
    const res = await axios.get("/balance/getbalance");
    setdashboarddata(res.data);
    // console.log(res.data);
  }

  useEffect(() => {
    getBalance();
  },[])

  return ( 
    <div className="account-container">
      <div className="inside-account">

        <div className="cards-col">
          <div className="card">
            <div className="card-text">
              <div>
                <h2>Total Balance : </h2>
              </div>
              <div className="card-rupee">
                <p><FormatPrice amount={dashboarddata?.balance} /></p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-text"> 
              <div>
                <h2>Total Income : </h2>
              </div>
              <div className="card-rupee">
                <p><FormatPrice amount={dashboarddata?.totalIncome} /></p>
              </div>
            </div> 
          </div>
          <div className="card">
            <div className="card-text">
              <div>
                <h2>Total Expense : </h2>
              </div>
              <div className="card-rupee">
                <p><FormatPrice amount={dashboarddata?.totalExpense} /></p>
              </div>
            </div>
          </div>
        </div>

        <div className="back-action">
          <button className="back-btn" onClick={() => navigate("/user/settings")}>Back</button>
        </div>

      </div>
    </div>
  )
}
