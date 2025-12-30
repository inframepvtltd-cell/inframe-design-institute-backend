import mongoose from 'mongoose'

const bookSessionSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, required: true },
  examType: { type: String, required: true }
})

export const bookSessionModel = mongoose.model('BookSession', bookSessionSchema)
