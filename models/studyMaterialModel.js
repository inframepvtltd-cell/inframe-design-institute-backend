import mongoose from "mongoose";
const studeyMaterialSchema = new mongoose.Schema({
  materialCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "study-material-category",
  },
  materialTitle: String,
  metaTitle: String,
  metaDescription: String,
  materialSlug: String,
  materialPrice: String,
  materialDescription: String,
  materialBannerImage: Object,
  materialPreviewImage: Object,
  materialBooksDescription: Array,
  materialDetails: String,
  materialSummeries: Array,
  materialFaqs: [
    {
      question: String,
      answer: String,
    },
  ],
});

const studyMaterialModel = mongoose.model(
  "study-materials",
  studeyMaterialSchema,
);

export { studyMaterialModel };
