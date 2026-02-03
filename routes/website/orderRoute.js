import express from 'express'
import { checkToken } from '../../middleware/checkTokenMid.js'
import { createOrderController, verifyAndSaveOrder } from '#controllers/website/orderController.js'

const orderRoute = express.Router()

orderRoute.post("/create-order", checkToken, createOrderController);
orderRoute.post("/verify-payment", checkToken, verifyAndSaveOrder);



export {orderRoute}