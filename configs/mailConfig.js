import nodemailer from 'nodemailer'

// It's better to store credentials in environment variables for security
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER || 'inframedesigninstitute@gmail.com',
    pass: process.env.MAIL_PASS || 'your-app-password-here',
  },
})

export default transporter
