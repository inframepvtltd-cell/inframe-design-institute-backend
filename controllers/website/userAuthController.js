import { userModel } from '../../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../../configs/mailConfig.js'

const saltRounds = 10
const myOtp = new Map()

export const userCreate = async (req, res) => {
  const { userEmail, userPassword, userPhone, userName } = req.body

  const obj = { userName, userEmail, userPhone, userPassword }

  const userRes = await userModel.findOne({ userEmail })

  if (!userRes) {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000).toString() // 4-digit OTP
      myOtp.set(userEmail, otp)

      await transporter.sendMail({
        from: '"OTP mail" <inframedesigninstitute@gmail.com>',
        to: userEmail,
        subject: 'OTP mail',
        text: '',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #FF5733;">Your OTP Code</h2>
            <p>Use the following <b style="font-size: 24px; color: #000;">${otp}</b> to complete your verification.</p>
            <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes.</p>
            <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
            <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
          </div>
        `
      })

      res.send({ status: 1, msg: 'Otp Sent' })
    } catch (error) {
      res.send({
        status: 0,
        msg: 'Something went wrong, try with a different Email!',
        error
      })
    }
  } else {
    res.send({ status: 2, msg: 'User already exists, Please Login!' })
  }
}

export const otpVerify = async (req, res) => {
  const { userEmail, userPassword, userPhone, otpValue, userName } = req.body
  const storeOtp = myOtp.get(userEmail)

  if (storeOtp === otpValue) {
    try {
      const hashedPassword = await bcrypt.hash(userPassword, saltRounds)
      const user = new userModel({
        userName,
        userEmail,
        userPhone,
        userPassword: hashedPassword
      })
      const userRes = await user.save()
      res.send({ status: 1, msg: 'User Created', userRes })
    } catch (error) {
      res.send({
        status: 0,
        msg: 'Something went wrong, try again later',
        error
      })
    }
  } else {
    res.send({ status: 2, msg: 'Invalid OTP, try again later' })
  }
}

export const userLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body
  const userData = await userModel.findOne({ userEmail })

  if (!userData) {
    return res.send({ status: 3, msg: 'User not found, Please register!' })
  }

  const isMatch = await bcrypt.compare(userPassword, userData.userPassword)
  if (!isMatch) {
    return res.send({ status: 2, msg: 'Invalid Password' })
  }

  const token = jwt.sign(
    { id: userData._id, userEmail: userData.userEmail },
    process.env.TOKENKEY
  )

  res.send({ status: 1, msg: 'User login successfully', userData, token })
}
