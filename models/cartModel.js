import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userData: { type: Object, required: true },
  courseDetails: { type: Object, required: true },
  quantity: { type: Number, default: 1 },
  main: { type: String }
})

export const cartModel = mongoose.model('Cart', cartSchema)
