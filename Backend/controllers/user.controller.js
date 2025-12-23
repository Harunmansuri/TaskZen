import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // Normalize email
    email = email.trim().toLowerCase();
    // 1️⃣ Required fields check
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password cannot be empty",
      });
    }

    if (username.length < 5 || username.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 5 and 30 characters long",
      });
    }

    // 2️⃣ Email format validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 3️⃣ Password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // 4️⃣ Case-insensitive email check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 6️⃣ Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 7️⃣ Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    if (user) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
        sameSite: "None",
      });
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
