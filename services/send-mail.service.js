import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (to, otp) => {
    try {
        await resend.emails.send({
            from: `AlignHire AI <${process.env.FROM_EMAIL}>`,
            to,
            subject: "Verify your email",
            html: `
                <h2>Your OTP Code</h2>
                <p>Your verification code is:</p>
                <h1>${otp}</h1>
                <p>This code will expire in 5 minutes.</p>
                <br/>
                <p>If you didn't request this, ignore this email.</p>
            `
        });

        console.log("OTP email sent successfully");
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
};

export const sendResetPasswordLink = async (to, resetUrl) => {
    try {
        await resend.emails.send({
            from: `AlignHire AI <${process.env.FROM_EMAIL}>`,
            to,
            subject: "Reset your password",
            html: `
                <h2>Password Reset Request</h2>
                <p>You requested to reset your password.</p>
                <p>Click the button below to reset it:</p>
                
                <a href="${resetUrl}" 
                style="display:inline-block;
                        padding:10px 20px;
                        background-color:#4f46e5;
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:5px;">
                    Reset Password
                </a>

                <p>This link will expire in 15 minutes.</p>
                <br/>
                <p>If you didn't request this, you can safely ignore this email.</p>
            `
        })

        console.log("Reset password link sent successfully");
    } catch (error) {
        console.error("Error sending reset password link:", error);
        throw error;
    }
}