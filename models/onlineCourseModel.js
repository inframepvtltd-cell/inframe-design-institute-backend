import mongoose from 'mongoose'

const onlineCourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'onlineCategory', // Reference to Category model
    required: true
  },
  courseImage: { type: Object },
  courseHeadline: { type: String }, // fixed typo: cousreHeadline → courseHeadline
  courseAbout: { type: String },
  courseBannerImage: { type: Object },
  coursePoints: { type: [String] },
  coursePrice: { type: String },
  courseHeroImage: { type: Object },
  courseRecordingTitle: { type: [String] },
  courseRecordingDuration: { type: [String] },
  courseRecordingUrl: { type: [String] },
  courseStudyMaterialName: { type: [String] },
  courseStudyMaterials: { type: Object },
  courseLearnPoints: { type: [String] },
  courseFaqsQuestions: { type: [String] },
  courseFaqsAnswer: { type: [String] },
  courseMetaTitle: { type: String },
  courseMetaDescription: { type: String }
})

export const onlineCourseModel = mongoose.model('OnlineCourse', onlineCourseSchema)
