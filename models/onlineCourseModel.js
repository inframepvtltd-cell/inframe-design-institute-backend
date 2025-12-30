import mongoose from "mongoose";

const onlineCourseSchema = new mongoose.Schema({
    courseName: String,
    courseCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'onlineCategory', // Reference to Category model
        required: true
    },
    courseImage: Object,
    cousreHeadline: String,
    courseAbout: String,
    courseBannerImage: Object,
    coursePoints: Array,
    coursePrice: String,
    courseHeroImage: Object,
    courseRecordingTitle: Array,
    courseRecordingDuration: Array,
    courseRecordingUrl: Array,
    courseStudyMaterialName: Array,
    courseStudyMaterials: Object,
    courseLearnPoints: Array,
    courseFaqsQuestions: Array,
    courseFaqsAnswer: Array,
    courseMetaTitle: String,
    courseMetaDescription: String
});

const onlineCourseModel = mongoose.model('online-course', onlineCourseSchema);

export { onlineCourseModel };
