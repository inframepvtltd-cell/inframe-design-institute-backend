import express from 'express';
import { checkToken } from '../../middleware/checkTokenMid.js';
import { createorderRazor } from '../../controllers/website/razorPayController.js';

const razorpayRoute = express.Router();

razorpayRoute.post('/create-order', checkToken, createorderRazor);

export { razorpayRoute };
