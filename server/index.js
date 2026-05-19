import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

import UserModel from "./models/UserModel.js";
import AdminModel from "./models/AdminModel.js";
import ShopModel from "./models/ShopModel.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const conStr =
  "mongodb+srv://admin:admin123@cluster0.xnumxqx.mongodb.net/giftMap?appName=Cluster0";

mongoose
  .connect(conStr)
  .then(() => {
    createDefaultAdmin();
  })
  .catch((err) => console.log("MongoDB error:", err));

const createDefaultAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;

  const exists = await AdminModel.findOne({ email: adminEmail });

  if (!exists) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await AdminModel.create({
      firstName: "Admin",
      lastName: "System",
      email: adminEmail,
      phone: "0000000000",
      address: "System",
      profilePic:
        "https://th.bing.com/th/id/R.fc9e3d5f981e9d0c49ea0ff194262caf?rik=WhZvKrZCl12WJg&pid=ImgRaw&r=0",
      password: hashed,
    });
  }
};

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await AdminModel.findOne({ email });

    if (admin) {
      const passValid = await bcrypt.compare(password, admin.password);

      if (!passValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.status(200).json({
        message: "Admin login successful",
        user: { ...admin._doc, role: "admin" },
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passValid = await bcrypt.compare(password, user.password);

    if (!passValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: { ...user._doc, role: "user" },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      password,
      profilePic,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existsUser = await UserModel.findOne({ email });
    const existsAdmin = await AdminModel.findOne({ email });

    if (existsUser || existsAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    if (email === process.env.ADMIN_EMAIL) {
      const newAdmin = new AdminModel({
        firstName,
        lastName,
        email,
        phone,
        address,
        password: hashed,
        profilePic,
      });

      await newAdmin.save();

      return res.status(201).json({
        message: "Admin registered",
        role: "admin",
        user: newAdmin,
      });
    }

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      phone,
      address,
      password: hashed,
      profilePic: profilePic || null,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered",
      role: "user",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Register error",
      error: err.message,
    });
  }
});

app.post("/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ message: "If email exists, reset link sent" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `<a href="${resetURL}">${resetURL}</a>`,
    });

    return res.json({ message: "Reset link sent" });
  } catch (err) {
    return res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
});

app.post("/resetPassword/:token", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({ message: "Password reset success" });
  } catch (err) {
    return res.status(500).json({
      message: "Reset error",
      error: err.message,
    });
  }
});

app.get("/shops", async (req, res) => {
  try {
    const shops = await ShopModel.find({});
    return res.json(shops);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching shops" });
  }
});

app.get("/shops/:id", async (req, res) => {
  try {
    const shop = await ShopModel.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.json(shop);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching shop" });
  }
});

app.get("/admin/shops", async (req, res) => {
  try {
    const shops = await ShopModel.find({});
    return res.json(shops);
  } catch (err) {
    return res.status(500).json({ message: "Admin shops error" });
  }
});

app.post("/admin/shop/add", async (req, res) => {
  try {
    const shop = new ShopModel(req.body);
    await shop.save();
    return res.json({ message: "Shop added", shop });
  } catch (err) {
    return res.status(500).json({ message: "Add shop error" });
  }
});

app.put("/admin/shop/update", async (req, res) => {
  try {
    const shop = await ShopModel.findById(req.body.id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    Object.assign(shop, req.body);

    await shop.save();

    return res.json({ message: "Shop updated", shop });
  } catch (err) {
    return res.status(500).json({ message: "Update error" });
  }
});

app.delete("/admin/shop/delete/:id", async (req, res) => {
  try {
    await ShopModel.findByIdAndDelete(req.params.id);
    return res.json({ message: "Shop deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Delete error" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
