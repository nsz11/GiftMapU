import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Login from "../components/Login";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const renderLogin = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe("Login Page", () => {
  test("Should render login page correctly", () => {
    renderLogin();

    const title = screen.getByRole("heading", {
      name: /login/i,
    });

    expect(title).toBeInTheDocument();
  });

  test("Should render GiftMap logo text", () => {
    renderLogin();

    const logo = screen.getByText(/giftmap/i);

    expect(logo).toBeInTheDocument();
  });

  test("Should update email input value", () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText(/email/i);

    fireEvent.change(emailInput, {
      target: { value: "test@test.com" },
    });

    expect(emailInput.value).toBe("test@test.com");
  });

  test("Should update password input value", () => {
    renderLogin();

    const passwordInput =
      screen.getByPlaceholderText(/password/i);

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(passwordInput.value).toBe("123456");
  });

  test("Should render login button", () => {
    renderLogin();

    const button = screen.getByRole("button", {
      name: /login/i,
    });

    expect(button).toBeInTheDocument();
  });
});