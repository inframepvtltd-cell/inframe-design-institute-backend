import mongoose from 'mongoose'
const studeyMaterialSchema = new mongoose.Schema({
    materialCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'study-material-category' },
    materialTitle: String,
    materialSlug: String,
    materialPrice: String,
    materialDescription: String,
    materialBannerImage: Object,
    materialPreviewImage: Object,
    materialDetails: String,
    materialSummeries: Array,
})

const studyMaterialModel = mongoose.model('study-materials', studeyMaterialSchema)

export { studyMaterialModel }