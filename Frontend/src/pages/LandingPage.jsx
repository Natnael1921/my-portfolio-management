import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Natnael Mekonnen</h1>
        <p>Admin Dashboard</p>
        <button className="landing-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
