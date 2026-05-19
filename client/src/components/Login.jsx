import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../slices/userSlice";

import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, msg } = useSelector((state) => state.user);

  /* =========================
     LOGIN
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginThunk({ email, password })
    );

    const user = result.payload?.user;

    // SAVE TO LOCALSTORAGE
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      // REDIRECT BASED ON ROLE
      if (user.role === "admin") {
        navigate("/AdminPage");
      } else {
        navigate("/home");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🎁 GiftMap</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ERROR MESSAGE */}
          {msg && <p className="error">{msg}</p>}

          {/* BUTTON */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* REGISTER */}
        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;