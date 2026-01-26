import Razorpay from "razorpay";
import crypto from "crypto";
import { cartModel } from "../../models/cartModel.js";
import orderModel from "../../models/orderModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const createorderRazor = async (req, res) => {
  try {
    const { amount, id } = req.body; // ✅ Expecting id from frontend

    const amountInRupees = Number(amount);
    if (!amountInRupees || amountInRupees <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const amountInPaise = Math.round(amountInRupees * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: { purpose: "Order Payment", id },
    });

    await orderModel.create({
      id, // store the user ID here
      razorpayOrderId: order.id,
      amount: amountInRupees,
      status: "CREATED",
    });

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// Verify Razorpay Payment
export const verifyRazorPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, id } = req.body; // ✅ Expecting id

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Payment verified
    await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { status: "PAID", razorpayPaymentId: razorpay_payment_id }
    );

    // Clear cart
    await cartModel.deleteMany({ id }); // ✅ use id to clear cart

    return res.status(200).json({ success: true, message: "Payment successful, cart cleared" });
  } catch (error) {
    console.error("Payment Verification Error:", error.message);
    return res.status(500).json({ success: false, message: "Payment verification failed", error: error.message });
  }
};
