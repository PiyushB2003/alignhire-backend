import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import { generateOtp } from "../utils/generate-otp.js";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../services/send-mail.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required", status: false });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exist", status: false });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = generateOtp();
        await sendOtpEmail(email, otp);

        const hashedOtp = await bcrypt.hash(otp.toString(), 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            otp: hashedOtp,
            otpExpires: new Date(Date.now() + 5 * 60 * 1000) // 5 mins
        })

        return res.status(201).json({ message: "Registraion successfull, otp sent to email.", userId: user._id, status: true })
    } catch (error) {
        console.error("Error in register", error);
        return res.status(500).json({ message: error.message, status: false })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "All fields are required", status: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found", status: false });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified", status: false });
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({ message: "OTP not found", status: false });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "OTP expired", status: false });
        }

        const isOtpValid = await bcrypt.compare(
            otp.toString(),
            user.otp
        );

        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP", status: false });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return res.status(200).json({
            message: "User verified successfully",
            status: true
        });

    } catch (error) {
        console.error("Error in verifyOtp", error);
        return res.status(500).json({ message: error.message, status: false });
    }
};

export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email){
            return res.status(400).json({ message: "Email is required", status: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found", status: false });
        }

        if(user.isVerified){
            return res.status(400).json({ message: "User already verified", status: false });
        }

        const otp = generateOtp();
        await sendOtpEmail(email, otp);

        const hashedOtp = await bcrypt.hash(otp.toString(), 10)

        user.otp = hashedOtp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 mins

        await user.save();

        return res.status(200).json({ message: "OTP resent successfully", status: true });
    } catch (error) {
        console.error("Error in resendOtp", error);
        return res.status(500).json({ message: error.message, status: false });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", status: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", status: false });
        }

        if (user.isVerified === false) {
            return res.status(400).json({ message: "User not verified", status: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials", status: false })
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
    } catch (error) {
        console.error("Error in login", error);
        return res.status(500).json({ message: error.message, status: false })
    }
}