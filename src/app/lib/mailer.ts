import nodemailer from 'nodemailer';
import crypto from 'crypto';
import UserModel from '../models/user';

export interface EmailProps {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}
export const sendEmail = async ({ email, emailType, userId }: EmailProps) => {
    try {
        //create verifiy Token
        const verifyToken = crypto.randomBytes(32).toString("hex");

        if (emailType === "VERIFY") {
            // Handle verification email logic
            await UserModel.findByIdAndUpdate(userId, { verifyToken, verifyTokenExpiry: Date.now() + 3600000 });
        } else if (emailType === "RESET") {
            await UserModel.findByIdAndUpdate(userId, { forgotPasswordToken: verifyToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
            // Handle password reset email logic
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS, 
            },
        });

        const emailData={
            from: process.env.EMAIL,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${verifyToken}">here</a>
             to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${emailType}
            </p>`
        }

        const response = await transporter.sendMail(emailData);

        console.log("Message sent: %s", response);
        return response

    } catch (error: any) {
        console.log("err in sending email:", error)
        throw new Error(error.message)
    }
}