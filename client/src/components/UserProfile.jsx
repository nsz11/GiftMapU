import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";
import "../styles/Profile.css";

const UserProfile = () => {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* TOP */}
        <div className="profile-header">

          <div className="profile-image">

            <img
              src={
                user?.profilePic
                  ? user.profilePic
                  : `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=7a3d8a&color=fff`
              }
              alt="profile"
              className="profile-img"
            />

          </div>

          <h1>
            {user?.firstName} {user?.lastName}
          </h1>

          <p className="profile-role">
            {user?.role === "admin"
              ? "Administrator"
              : "GiftMap User"}
          </p>

        </div>

        <div className="profile-info">

          <div className="info-box">
            <span>Email</span>
            <p>{user?.email}</p>
          </div>

          <div className="info-box">
            <span>Phone</span>
            <p>{user?.phone}</p>
          </div>

          <div className="info-box">
            <span>Address</span>
            <p>{user?.address}</p>
          </div>

        </div>

        {/* LOGOUT */}
        <div className="logout-section">

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;
