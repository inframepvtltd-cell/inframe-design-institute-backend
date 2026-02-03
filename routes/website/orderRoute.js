import express from 'express'
import { checkToken } from '../../middleware/checkTokenMid.js'
import { createOrder, verifyAndSaveOrder } from '../../controllers/website/orderController.js'

const orderRoute = express.Router()

orderRoute.post("/create-order", checkToken, createOrder);
orderRoute.post("/purchased-courses", checkToken, verifyAndSaveOrder);



export {orderRoute}