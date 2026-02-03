import { createOrder, verifyPayment } from "#services/paymentService.js";
import { offlineCourseModel } from "../../models/offlineCourseModel.js";
import { onlineCourseModel } from "../../models/onlineCourseModel.js";
import orderModel from "../../models/orderModel.js";
import razorpay from "./../../utils/razorpayUtil.js";

// Create Razorpay order
export const createOrderController = async (req, res) => {
  try {
    const { courseId, id } = req.body;

    if (!courseId && !id) {
      return res.status(400).json({
        success: false,
        message: "courseId and user id is required",
      });
    }

    let courseRes = await onlineCourseModel.findById(courseId);
    let courseType = "online";

    if (!courseRes) {
      courseRes = await offlineCourseModel.findById(courseId);
      courseType = "offline";
    }

    if (!courseRes) {
      throw new Error("Course not found");
    }

    const amount = Number(courseRes.coursePrice) * 100;

    await orderModel.create({
      userId: id,
      courseId,
      courseType,
      amount,
    });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to create order",
    });
  }
};

// Verify Razorpay payment
export const verifyAndSaveOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const verified = await verifyPayment(req.body);

    if (!verified) {
      await orderModel.updateOne(
        { userId: id },
        { $set: { paymentStatus: "failed" } },
      );

      return res.status(400).json({ success: false });
    }

    await orderModel.updateOne(
      {
        userId: id
      },
      {
        $set: {
          razorpayOrderId: verified.razorpay_order_id,
          razorpayPaymentId: verified.razorpay_payment_id,
          razorpaySignature :  verified.razorpay_signature,
          paymentStatus: "success",
        },
      },
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ success: false });
  }
};
