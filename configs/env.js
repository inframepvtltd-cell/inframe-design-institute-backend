import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error('RAZORPAY_KEY_ID missing in env');
}
