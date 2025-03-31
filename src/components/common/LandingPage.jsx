import { UserSidebar } from "../layout/UserSidebar";
import "../../assets/css/landingpage.css"

export const LandingPage = () => {
  return (
    <>
      <div className="user-sidebar"> {/* Ensure this div wraps sidebar & content */}
           <UserSidebar />
      <div className="landing-container">
        <h1>Landing Page</h1>
      </div>
    </div>
    </>
  )
}
