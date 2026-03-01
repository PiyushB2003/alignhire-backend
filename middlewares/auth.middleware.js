import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                message: "Not authorized, token missing",
                status: false
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                status: false
            });
        }
        if (!user.isVerified) {
            return res.status(401).json({
                message: "User not verified",
                status: false
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protect middleware", error);
        return res.status(401).json({ message: error.message, status: false });
    }
}