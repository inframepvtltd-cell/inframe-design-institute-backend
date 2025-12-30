import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userphone: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true }
});

const userModel = mongoose.model('user', UserSchema);

export { userModel };
