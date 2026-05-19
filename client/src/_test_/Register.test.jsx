import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Register from "../components/Register";

const renderRegister = () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

describe("Register Page", () => {

  it("Should render register page correctly", () => {
    renderRegister();

    const title = screen.getByRole("heading", {
      name: "Register",
    });

    expect(title).toBeInTheDocument();
  });

  it("Should render GiftMap logo", () => {
    renderRegister();

    const logo = screen.getByText("🎁 GiftMap");

    expect(logo).toBeInTheDocument();
  });

  it("Should update First Name input", () => {
    renderRegister();

    const input = screen.getByPlaceholderText("First Name");

    fireEvent.change(input, {
      target: { value: "Zainab" },
    });

    expect(input.value).toBe("Zainab");
  });

  it("Should update Email input", () => {
    renderRegister();

    const input = screen.getByPlaceholderText("Email");

    fireEvent.change(input, {
      target: { value: "test@gmail.com" },
    });

    expect(input.value).toBe("test@gmail.com");
  });

  it("Should update Password input", () => {
    renderRegister();

    const input = screen.getByPlaceholderText("Password");

    fireEvent.change(input, {
      target: { value: "123456" },
    });

    expect(input.value).toBe("123456");
  });

  it("Should update Confirm Password input", () => {
    renderRegister();

    const input = screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(input, {
      target: { value: "123456" },
    });

    expect(input.value).toBe("123456");
  });

});