import mongoose from 'mongoose'

const offlineCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    unique: true,
    required: true
  }
})

export const offlineCategoryModel = mongoose.model('OfflineCategory', offlineCategorySchema)
