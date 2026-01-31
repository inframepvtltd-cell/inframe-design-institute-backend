import Razorpay from "razorpay";
import crypto from "crypto";
import { pool } from "../configs/postgresconnection.js";
// import pool from "#config/pg_db.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const createOrder = async (courseId) => {
  // Fetch course price
  const courseRes = await pool.query(
    `SELECT price FROM courses WHERE id = $1`,
    [courseId],
  );

  if (!courseRes.rows.length) {
    throw new Error("Course not found");
  }

  const amount = Number(courseRes.rows[0].price) * 100;

  // Create Razorpay order
  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return order;
};

// Verify Razorpay signature
export const verifyPayment = ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return false;
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === razorpay_signature;
};

export const createOrderByEnrollment = async (enrollmentId) => {
  const res = await pool.query(`SELECT price FROM enrollments WHERE id = $1`, [
    enrollmentId,
  ]);

  if (!res.rows.length) {
    throw new Error(
      "Please wait for 30 seconds and again click. Your request is being processed. Thank you for your patience.",
    );
  }

  const amount = Math.round(Number(res.rows[0].price) * 100);

  // SHORT RECEIPT (MAX 40)
  const receipt = `en_${enrollmentId.replace(/-/g, "").slice(0, 20)}`;

  return await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt,
  });
};

export const markPaymentPaid = async ({
  enrollmentId,
  razorpay_payment_id,
}) => {
  const res = await pool.query(
    `UPDATE enrollments
     SET payment_status = 'PAID',
         razorpay_payment_id = $1
     WHERE id = $2
     RETURNING *`,
    [razorpay_payment_id, enrollmentId],
  );

  const enrollment = res.rows[0];

  return enrollment;
};
