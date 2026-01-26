import mongoose from "mongoose";
const freeResPageSchema = mongoose.Schema({
  resFaqs: [
    {
      question: String,
      answers: String,
    },
  ],
  metaTitle: String,
  metaDescription: String,
});

const freeResPageModel = mongoose.model(
  "free-resources-page",
  freeResPageSchema,
);

export { freeResPageModel };
