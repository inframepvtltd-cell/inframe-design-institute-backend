import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: String,
    userData: Object,
    courseDetails: Object,
    quantity: Number,
    main: String
});

const cartModel = mongoose.model('cart', cartSchema);

export { cartModel };
