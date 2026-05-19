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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginThunk({ email, password })
    );

    const user = result.payload?.user;

    
    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      
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

          
          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          
          <label htmlFor="password">
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          
          {msg && (
            <p className="error">
              {msg}
            </p>
          )}

          
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
