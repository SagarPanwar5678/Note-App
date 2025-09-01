// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Invalid token." });

        req.user = user; // attach user to request
        next(); // pass control to next middleware/route
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
module.exports = verifyToken;
