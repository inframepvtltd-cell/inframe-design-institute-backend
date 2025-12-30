import mongoose from "mongoose";

const onlineCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true,
    }
});

const onlineCategoryModel = mongoose.model('onlineCategory', onlineCategorySchema);

export { onlineCategoryModel };
