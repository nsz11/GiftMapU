import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <>
      <div className="navbar-top-strip" />

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/home" className="nav-logo">
            <svg width="42" height="42" viewBox="0 0 64 64" fill="#7a3d8a">
              <rect x="6" y="24" width="52" height="34" rx="2" />
              <rect x="28" y="24" width="8" height="34" fill="#fff" />
              <rect x="6" y="20" width="52" height="10" rx="2" />
              <rect x="28" y="20" width="8" height="10" fill="#fff" />
              <path d="M32,20 C20,20 16,10 22,6 C28,2 32,12 32,20 Z" />
              <path d="M32,20 C44,20 48,10 42,6 C36,2 32,12 32,20 Z" />
            </svg>
            <span className="logo-text">GifMap</span>
          </Link>

          <ul className="nav-menu">
            <li>
              <Link to="/home" className={isActive("/home") ? "active" : ""}>
                HOME
              </Link>
            </li>
            <li className="separator">|</li>

            <li>
              <Link to="/map" className={isActive("/map") ? "active" : ""}>
                MAP
              </Link>
            </li>
            <li className="separator">|</li>

            <li>
              <Link to="/shops" className={isActive("/shops") ? "active" : ""}>
                SHOP
              </Link>
            </li>
            <li className="separator">|</li>

            <li>
              <Link to="/about" className={isActive("/about") ? "active" : ""}>
                ABOUT US
              </Link>
            </li>

            {user?.role === "admin" && (
              <>
                <li className="separator">|</li>
                <li>
                  <Link
                    to="/AdminPage"
                    className={isActive("/AdminPage") ? "active" : ""}
                  >
                    EDIT / ADD
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="nav-right">
            <button
              className="cart-icon user-avatar"
              onClick={() => navigate("/profile")}
              title="Profile"
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="user"
                  className="avatar-img"
                />
              ) : (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5a3a6f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;