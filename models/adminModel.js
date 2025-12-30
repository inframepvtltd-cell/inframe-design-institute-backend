import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    admin_userEmail: { type: String, required: true },
    admin_userPassword: { type: String, required: true }
  },
  { timestamps: true }
)

export const adminModel = mongoose.model('Admin', adminSchema)
