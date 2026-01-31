// import { sendEnrollmentPaidToSheet } from "#utils/googleSheets.js";
// import * as paymentService from "./payment.service.js";
// import * as enrollmentService from "../enrollments/enrollment.service.js";
import * as paymentService from "../../services/payment.service.js";
// import { sendEnrollmentPaidEmail } from "#utils/emailService.js";
// import { sendEnrollmentWhatsAppPurchase } from "#utils/whatsappService.js";

// Create Razorpay order
export const createPaymentOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    const order = await paymentService.createOrder(courseId);

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
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const verified = await paymentService.verifyPayment(req.body);

    if (!verified) {
      return res.status(400).json({ success: false });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ success: false });
  }
};

export const createEnrollmentOrder = async (req, res) => {
  try {
    const { enrollmentId } = req.body;
    console.log(enrollmentId);

    if (!enrollmentId) {
      return res.status(400).json({
        success: false,
        message: "Enrollment ID required",
      });
    }

    const order = await paymentService.createOrderByEnrollment(enrollmentId);

    return res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Create enrollment order error:", error);

    return res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

export const verifyEnrollmentPayment = async (req, res) => {
  try {
    const verified = await paymentService.verifyPayment(req.body);

    if (!verified) {
      console.warn("Payment verification failed:", req.body);
      return res.status(400).json({ success: false });
    }

    // MARK PAYMENT AS PAID
    const enrollment = await enrollmentService.markPaymentPaid({
      enrollmentId: req.body.enrollmentId,
      razorpay_order_id: req.body.razorpay_order_id,
      razorpay_payment_id: req.body.razorpay_payment_id,
    });

    // Inline mapping to Sheet payload
    // const sheetPayload = {
    //   name: enrollment.name,
    //   email: enrollment.email,
    //   contact: enrollment.phone_number, 
    //   courseName: enrollment.course_name, 
    //   price: enrollment.price,
    //   RazorpayId:
    //     enrollment.razorpay_payment_id || enrollment.razorpay_order_id || "",
    // };

    // console.log("Sheet payload prepared:", sheetPayload);

    // Prepare email payload
    // const emailPayload = {
    //   name: enrollment.name,
    //   email: enrollment.email,
    //   phone_number: enrollment.phone_number,
    //   course_name: enrollment.course_name,
    //   price: enrollment.price,
    //   razorpay_id: enrollment.razorpay_payment_id,
    // };

    // console.log("📧 Email payload prepared:", emailPayload);

    // 🔹 Trigger both in parallel
    // const results = await Promise.allSettled([
    //   sendEnrollmentPaidToSheet(sheetPayload),
    //   sendEnrollmentPaidEmail(emailPayload),
    //   sendEnrollmentWhatsAppPurchase({
    //         phone_number: enrollment.phone_number,
    //         name: enrollment.name,
    //         course_name: enrollment.course_name,
    //         price: enrollment.price,
    //       }),
    // ]);

    // 🔹 Debug results
    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        console.log(`✅ Task ${i} succeeded:`, r.value);
      } else {
        console.error(`❌ Task ${i} failed:`, r.reason);
      }
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Error in verifyEnrollmentPayment:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
