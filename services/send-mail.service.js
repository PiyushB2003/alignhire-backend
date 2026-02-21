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