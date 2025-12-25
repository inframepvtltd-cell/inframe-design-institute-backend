const express = require('express')
const { checkToken } = require('../../middleware/checkTokenMid')
const { createorderRazor } = require('../../controllers/website/razorPayController')

const razorpayRoute = express.Router()

razorpayRoute.post('/create-order', checkToken, createorderRazor)


module.exports = { razorpayRoute }