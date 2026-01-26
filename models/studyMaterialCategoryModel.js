import mongoose from "mongoose";

const studyMaterialCategorySchema = new mongoose.Schema({
    studyCategoryName: String
});

const studyMaterialCategoryModel = mongoose.model('study-material-category', studyMaterialCategorySchema);

export { studyMaterialCategoryModel }