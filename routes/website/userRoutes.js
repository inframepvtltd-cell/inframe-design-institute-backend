import express from 'express'
import {
  userCreate,
  otpVerify,
  userLogin
} from '../../controllers/website/userAuthController.js'

const userRoutes = express.Router()

userRoutes.post('/register', userCreate)
userRoutes.post('/otp-verify', otpVerify)
userRoutes.post('/login', userLogin)

export { userRoutes }
