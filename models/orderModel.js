import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // assuming you have a User model
            required: true,
        },
        razorpayOrderId: {
            type: String,
            required: true,
        },
        razorpayPaymentId: {
            type: String,
        },
        amount: {
            type: Number, // in Rupees
            required: true,
        },
        currency: {
            type: String,
            default: "INR",
        },
        status: {
            type: String,
            enum: ["CREATED", "PAID", "FAILED"],
            default: "CREATED",
        },
        notes: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true, // createdAt & updatedAt
    }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
