import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    courseType: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    // 🔹 Razorpay fields
    razorpayOrderId: {
      type: String,
      default: null,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      default: "razorpay",
    },
  },
  { timestamps: true },
);

// 🔥 Prevent overwrite error (Next.js / nodemon safe)
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
