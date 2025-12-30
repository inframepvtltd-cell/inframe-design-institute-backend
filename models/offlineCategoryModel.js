import mongoose from "mongoose";

const offlineCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true,
    }
});

const offlineCategoryModel = mongoose.model('offlineCategory', offlineCategorySchema);

export { offlineCategoryModel };
