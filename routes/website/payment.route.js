import { Router } from "express";
import {
  createPaymentOrder,
  verifyRazorpayPayment,
  createEnrollmentOrder,
  verifyEnrollmentPayment
} from "../../controllers/website/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/create-order", createPaymentOrder);
paymentRouter.post("/verify", verifyRazorpayPayment);

// enrollment payment
paymentRouter.post("/enrollment-create-order", createEnrollmentOrder);
paymentRouter.post("/enrollment-verify", verifyEnrollmentPayment);

export default paymentRouter;
