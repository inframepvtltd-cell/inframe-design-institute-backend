import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../../models/orderModel.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const { id, courseId, amount } = req.body;
        console.log(amount)

        if (!id || !courseId || !amount) {
            return res.status(400).json({
                status: -1,
                message: "Missing required fields",
            });
        }

        const options = {
            amount: Math.round(amount * 100), // paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                id,
                courseId,
            },
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            status: 1,
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({
            status: -5,
            message: "Failed to create order",
            error: error.message,
        });
    }
};



export const verifyAndSaveOrder = async (req, res) => {
    try {
        const {
            id,
            courseId,
            amount,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        if (
            !id ||
            !courseId ||
            !amount ||
            !razorpayPaymentId ||
            !razorpayOrderId ||
            !razorpaySignature
        ) {
            return res.status(400).json({
                status: -1,
                message: "Missing required fields",
            });
        }

        // 🔐 VERIFY SIGNATURE
        const body = `${razorpayOrderId}|${razorpayPaymentId}`;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpaySignature) {
            return res.status(400).json({
                status: -2,
                message: "Payment verification failed",
            });
        }

        // 💾 SAVE ORDER
        const newOrder = await orderModel.create({
            id,
            courseId,
            amount: Number(amount),
            razorpayOrderId,
            razorpayPaymentId,
            paymentStatus: "success",
        });

        res.status(201).json({
            status: 1,
            message: "Payment verified & order saved",
            order: newOrder,
        });
    } catch (error) {
        console.error("Verify Order Error:", error);
        res.status(500).json({
            status: -5,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

