import { BarChart } from '@mui/x-charts/BarChart';
import "../../assets/css/report.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Report = () => {

  const [selectedreport,setselectedreport] = useState("Day");
  const [daywisereport,setdaywisereport] = useState([]);
  const [weekwisereport,setweekwisereport] = useState([]);
  const [monthwisereport,setmonthwisereport] = useState([]);
  const [yearwisereport,setyearwisereport] = useState([]);

  const DayWiseReport = async () => {
    const res =  await axios.get("/report/daywisereport");
    setdaywisereport(res.data.data);
    // console.log(res.data.data);
  }

  const WeekWiseReport = async () => {
    const res =  await axios.get("/report/weekwisereport");
    setweekwisereport(res.data.data);
    // console.log(res.data.data);
  }

  const MonthWiseReport = async () => {
    const res =  await axios.get("/report/monthwisereport");
    setmonthwisereport(res.data.data);
    // console.log(res.data.data);
  }

  const YearWiseReport = async () => {
    const res =  await axios.get("/report/yearwisereport");
    setyearwisereport(res.data.data);
    // console.log(res.data.data);
  }

  useEffect(() => {
    DayWiseReport();
    WeekWiseReport();
    MonthWiseReport();
    YearWiseReport();
  },[])

  return (
    <>
      <div className="report-container">
        <div className="inside-report">

          {/* 1. report deadline */}
          <div className="report-cards">
            <div className="report-card-title">
              <h2 onClick={() => setselectedreport("Day")}>Day</h2>
            </div>
            <div className="report-card-title">
              <h2 onClick={() => setselectedreport("Week")}>Week</h2>
            </div>
            <div className="report-card-title">
              <h2 onClick={() => setselectedreport("Month")}>Month</h2>
            </div>
            <div className="report-card-title">
              <h2 onClick={() => setselectedreport("Year")}>Year</h2>
            </div>
          </div>

          {/* 2. chart section */}
          <div className='chart'>
            {
              selectedreport === "Day" && (
                <BarChart
                  // key="Day"
                  xAxis={[{ scaleType: 'band', data: ['Mon', 'Tue' , 'Wed', 'Tue', 'Fri', 'Sat' , 'Sun'] }]}
                  series={[
                    { 
                      data: [ 
                        daywisereport?.Monday?.income || 0,
                        daywisereport?.Tuesday?.income || 0,
                        daywisereport?.Wednesday?.income || 0,
                        daywisereport?.Thursday?.income || 0,
                        daywisereport?.Friday?.income || 0,
                        daywisereport?.Saturday?.income || 0,
                        daywisereport?.Sunday?.income || 0
                      ] 
                    }, // First Income dataset (7 values)
                    { 
                      data: [ 
                        daywisereport?.Monday?.expense || 0,
                        daywisereport?.Tuesday?.expense || 0,
                        daywisereport?.Wednesday?.expense || 0,
                        daywisereport?.Thursday?.expense || 0,
                        daywisereport?.Friday?.expense || 0,
                        daywisereport?.Saturday?.expense || 0,
                        daywisereport?.Sunday?.expense || 0
                      ] 
                    } // Second Expense dataset (7 values)
                  ]}
                  // width={window.innerWidth * 0.78} // 90% of the screen width
                  width={1000}
                  height={400}
                />
              )

            }
          </div>

          <div className='chart'>
            {
              selectedreport === "Week" && (
                <BarChart
                  // key="Week"
                  xAxis={[{ scaleType: 'band', data: ['Week1', 'Week2', 'Week3', 'Week4'] }]}
                  series={[
                    { 
                      data: [
                        weekwisereport?.Week1.income || 0, 
                        weekwisereport?.Week2.income || 0, 
                        weekwisereport?.Week3.income || 0, 
                        weekwisereport?.Week4.income || 0
                      ] 
                    }, // First Income dataset (4 values)
                    { 
                      data: [
                        weekwisereport?.Week1.expense || 0, 
                        weekwisereport?.Week2.expense || 0, 
                        weekwisereport?.Week3.expense || 0, 
                        weekwisereport?.Week4.expense || 0
                      ]
                    }, // First Expense dataset (4 values)
                  ]}
                  width={1000}
                  height={400}
                />
              )
            }
          </div>

          <div className='chart'>
            {
              selectedreport === "Month" && (
                <BarChart
                  // key="Month"
                  xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }]}
                  series={[
                    { 
                      data: [
                        monthwisereport?.January.income || 0, 
                        monthwisereport?.February.income || 0, 
                        monthwisereport?.March.income || 0, 
                        monthwisereport?.April.income || 0, 
                        monthwisereport?.May.income || 0, 
                        monthwisereport?.Jun.income || 0, 
                        monthwisereport?.July.income || 0, 
                        monthwisereport?.August.income || 0, 
                        monthwisereport?.September.income || 0, 
                        monthwisereport?.October.income || 0, 
                        monthwisereport?.November.income || 0, 
                        monthwisereport?.December.income || 0
                      ] 
                    }, // First Income dataset (12 values)
                    { 
                      data: [
                        monthwisereport?.January.expense || 0, 
                        monthwisereport?.February.expense || 0, 
                        monthwisereport?.March.expense || 0, 
                        monthwisereport?.April.expense || 0, 
                        monthwisereport?.May.expense || 0, 
                        monthwisereport?.Jun.expense || 0, 
                        monthwisereport?.July.expense || 0, 
                        monthwisereport?.August.expense || 0, 
                        monthwisereport?.September.expense || 0, 
                        monthwisereport?.October.expense || 0, 
                        monthwisereport?.November.expense || 0, 
                        monthwisereport?.December.expense || 0
                      ] 
                    }, // First Expense dataset (12 values)
                  ]}
                  width={1000}
                  height={400}
                />
              )
            }
          </div>

          <div className='chart'>
            {
              selectedreport === "Year" && (
                <BarChart
                  // key="Year"
                  xAxis={[{ scaleType: 'band', data: ['2021', '2022', '2023', '2024'] }]}
                  series={[
                    { 
                      data: [
                        yearwisereport?.["2021"]?.income || 0, 
                        yearwisereport?.["2022"]?.income || 0, 
                        yearwisereport?.["2023"]?.income || 0, 
                        yearwisereport?.["2024"]?.income || 0
                    ]                    
                      , label: 'Income' }, // First Income dataset (4 values)
                    { 
                      data: [
                        yearwisereport?.["2021"]?.expense || 0, 
                        yearwisereport?.["2022"]?.expense || 0, 
                        yearwisereport?.["2023"]?.expense || 0, 
                        yearwisereport?.["2024"]?.expense || 0
                    ]
                    
                      , label: 'Expense' }, // First Expense dataset (4 values)
                  ]}
                  width={1000}
                  height={400}
                />
              )
            }
          </div>

        </div>
      </div>
    </>
  )
}
