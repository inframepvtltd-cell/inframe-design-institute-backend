import express from 'express'
import {
  addToCart,
  cartEntryView,
  removeFromCart
} from '../../controllers/website/cartController.js'
import { checkToken } from '../../middleware/checkTokenMid.js'

const cartRoute = express.Router()

cartRoute.post('/add-to-cart', checkToken, addToCart)
cartRoute.post('/view-cart', checkToken, cartEntryView)
cartRoute.post('/remove-from-cart', checkToken, removeFromCart)

export { cartRoute }
