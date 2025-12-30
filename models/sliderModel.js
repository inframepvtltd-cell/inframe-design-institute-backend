import mongoose from 'mongoose'

const sliderSchema = new mongoose.Schema({
  sliderImage: { type: Object, required: true },
  sliderHeadlineFirst: { type: String, required: true },
  sliderHeadlineSecond: { type: String, required: true },
  sliderDescription: { type: String, required: true }
})

export const sliderModel = mongoose.model('Slider', sliderSchema)
