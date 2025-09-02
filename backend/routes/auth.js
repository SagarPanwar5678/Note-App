const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const redisClient = require("../utils/redis");
const sendOTP = require("../utils/mail");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// ------------------ SIGNUP ------------------

// Send OTP for signup
router.post("/signup/send-otp", async (req, res) => {
    try {
        const { name, email, dateOfBirth } = req.body;

        if (!email || !name || !dateOfBirth) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please login instead." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP in Redis with 5 minutes expiry
        await redisClient.set(email, JSON.stringify({ otp, name, dateOfBirth }), { EX: 300 });

        // Send OTP
        await sendOTP(email, otp);

        res.json({ message: "OTP sent for signup. Check your email." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Verify OTP for signup
router.post("/signup/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const data = await redisClient.get(email);
        if (!data) return res.status(400).json({ message: "OTP expired or invalid" });

        const { otp: storedOtp, name, dateOfBirth } = JSON.parse(data);

        if (storedOtp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        const user = new User({ email, name, dateOfBirth });
        await user.save();

        await redisClient.del(email); // remove OTP after use

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Signup successful", token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ------------------ LOGIN ------------------

// Send OTP for login
router.post("/login/send-otp", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Email required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found. Please signup." });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await redisClient.set(email, JSON.stringify({ otp }), { EX: 300 });

        await sendOTP(email, otp);

        res.json({ message: "OTP sent for login. Check your email." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Verify OTP for login
router.post("/login/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const data = await redisClient.get(email);
        if (!data) return res.status(400).json({ message: "OTP expired or invalid" });

        const { otp: storedOtp } = JSON.parse(data);

        if (storedOtp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        await redisClient.del(email);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Everything fine");

        res.json({ message: "Login successful", token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ----------------------check token ----------------
router.post("/token/check",verifyToken,async(req,res)=>{
    res.json({message: "Token Is Valid"});
});

module.exports = router;
