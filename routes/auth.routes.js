import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
    forgotPassword,
    resetPassword,
    resendOtp,
    verifyOtp,
    register,
    logout,
    login
} from "../controllers/auth.controller.js";
import {
    forgotPasswordSchema,
    resetPasswordSchema,
    resendOtpSchema,
    verifyOtpSchema,
    registerSchema,
    loginSchema
} from "../validators/auth.validator.js";


const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);
router.post("/resend-otp", validate(resendOtpSchema), resendOtp);
router.post("/login", validate(loginSchema), login);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password/:token", validate(resetPasswordSchema), resetPassword);
router.post("/logout", protectRoute, logout);

export default router;