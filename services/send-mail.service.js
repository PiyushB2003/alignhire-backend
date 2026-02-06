import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: process.env.BREVO_SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD
    }
})

export const sendOtpEmail = async (to, otp) => {
    await transporter.sendMail({
        from: `"AlignHire AI" <${process.env.FROM_EMAIL}>`,
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
    })
}