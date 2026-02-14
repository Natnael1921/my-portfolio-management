import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {!isOpen && (
        <div className="hamburger" onClick={() => setIsOpen(true)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={() => setIsOpen(false)}>
          &times;
        </button>

        <h2 className="sidebar-logo">Natnael</h2>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </NavLink>
          <button className="sidebar-link logout-button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
