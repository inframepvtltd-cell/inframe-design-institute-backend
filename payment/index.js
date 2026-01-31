import paymentRouter from "./routes/payment.route.js";
import { Router } from "express";
const paymentModule = Router();
paymentModule.use('/payment', paymentRouter);
export default paymentModule;