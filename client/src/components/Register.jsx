import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import regFormValidationSchema from "../validations/RegisterValidation";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regFormValidationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://giftmapu-client-ugdx.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profilePic: data.profilePic || null,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
      alert("Connection error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>GiftMap</h1>
        <h2>Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="error">{errors.email.message}</p>
          )}

          <input
            type="text"
            placeholder="Phone"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="error">{errors.phone.message}</p>
          )}

          <input
            type="text"
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && (
            <p className="error">{errors.address.message}</p>
          )}

          <input
            type="url"
            placeholder="Profile Picture URL"
            {...register("profilePic")}
          />
          {errors.profilePic && (
            <p className="error">{errors.profilePic.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
