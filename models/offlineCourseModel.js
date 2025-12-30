import mongoose from 'mongoose'

const offlineCourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OfflineCategory',
    required: true
  },
  courseImage: { type: String },
  courseHeadline: { type: String }, // fixed typo: cousreHeadline → courseHeadline
  courseAbout: { type: String },
  courseBannerImage: { type: String },
  coursePoints: { type: [String] },
  coursePrice: { type: String },
  courseHeroImage: { type: String },
  courseFaqsQuestions: { type: [String] },
  courseFaqsAnswer: { type: [String] },
  courseMetaTitle: { type: String },
  courseMetaDescription: { type: String }
})

export const offlineCourseModel = mongoose.model('OfflineCourse', offlineCourseSchema)
