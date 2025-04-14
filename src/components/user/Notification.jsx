import { useState } from "react";
import "../../assets/css/notification.css";

export const Notification = () => {
    const [emailReports, setEmailReports] = useState(true);
    const [budgetAlerts, setBudgetAlerts] = useState(false);
    const [budgetThreshold, setBudgetThreshold] = useState(90);
    const [reminderFrequency, setReminderFrequency] = useState("daily");
    const [reminderTime, setReminderTime] = useState("09:00");
  
    const handleSave = () => {
      const preferences = {
        emailReports,
        budgetAlerts,
        budgetThreshold,
        reminderFrequency,
        reminderTime,
      };
      console.log("Saved Preferences:", preferences);
      alert("Preferences saved!");
    };
  
    return (
      <div className="notification-settings">
        <h2>Notification Preferences</h2>
  
        {/* Email Reports */}
        <div className="setting-item">
          <label className="toggle-label">
            <span>Receive Email Reports</span>
            <input
              type="checkbox"
              checked={emailReports}
              onChange={() => setEmailReports(!emailReports)}
            />
            <span className="toggle-switch"></span>
          </label>
          <p style={{marginTop:"0.5rem"}}>Get weekly/monthly expense summaries by email.</p>
        </div>
  
        {/* Budget Limit Alerts */}
        <div className="setting-item">
          <label className="toggle-label">
            <span>Budget Limit Alerts</span>
            <input
              type="checkbox"
              checked={budgetAlerts}
              onChange={() => setBudgetAlerts(!budgetAlerts)}
            />
            <span className="toggle-switch"></span>
          </label>
          <div className="sub-setting">
            <label htmlFor="budget-threshold">Alert me at (%)</label>
            <input
              type="number"
              id="budget-threshold"
              value={budgetThreshold}
              min="1"
              max="100"
              onChange={(e) => setBudgetThreshold(e.target.value)}
            />
          </div>
          <p style={{marginTop:"0.5rem"}}>
            You’ll get a notification when spending crosses this threshold.
          </p>
        </div>
  
        {/* Reminder Settings */}
        <div className="setting-item">
          <label htmlFor="reminder-frequency">Reminder Frequency</label>
          <select
            value={reminderFrequency}
            onChange={(e) => setReminderFrequency(e.target.value)}
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div className="setting-item">
           <label htmlFor="reminder-time">Reminder Time</label>
          <input
            type="time"
            id="reminder-time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
          <p style={{marginTop:"0.5rem"}}>We’ll remind you to log expenses or check your reports.</p>
        </div>
  
        <div className="save-settings">
          <button onClick={handleSave}>Save Preferences</button>
        </div>
      </div>
    );
  };