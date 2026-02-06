import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateOtp } from "../utils/generate-otp.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required",
                status: false
            });
        }
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                message: "User already exist",
                status: false
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
                status: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();
        const user = await User.create({
            email,
            password: hashedPassword,
            isVerified: false,
            otp,
            otpExpires: new Date(Date.now() + 5 * 60 * 1000) // 5 mins
        })
        console.log("OTP (for now):", otp);
        return res.status(201).json({
            message: "Registraion successfull, otp sent to email.",
            userId: user._id,
            status: true
        })
    } catch (error) {
        console.error("Error in register", error);
        return res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const {email, otp} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "User not found",
                status: false
            });
        }
        if(user.isVerified) {
            return res.status(400).json({
                message: "User already verified",
                status: false
            });
        }
        if(user.otp !== otp){
            return res.status(400).json({
                message: "Invalid OTP",
                status: false
            });
        }
        if(user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP expired",
                status: false
            });
        }
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        return res.status(200).json({
            message: "User verified successfully",
            status: true
        })
    } catch (error) {
        console.error("Error in verifyOtp", error);
        return res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            status: false
        });
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "User not found",
            status: false
        })
    }
    if(user.isVerified === false){
        return res.status(400).json({
            message: "User not verified",
            status: false
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Invalid credentials",
            status: false
        })
    }
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    )
    return res.status(200).json({
        message: "Login successfull",
        token,
        status: true,
        user: {
            id: user._id,
            email: user.email,
            name: user.name
        }
    })
}