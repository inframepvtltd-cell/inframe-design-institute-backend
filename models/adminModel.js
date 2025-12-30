import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    admin_userEmail: { type: String, required: true },
    admin_userPassword: { type: String, required: true }
}, { timestamps: true })

const adminModel = mongoose.model('admin', adminSchema)

export { adminModel }