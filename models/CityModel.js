import mongoose from 'mongoose'

const citySchema = new mongoose.Schema({
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
  cityName: { type: String, required: true }
})

export const cityModel = mongoose.model('City', citySchema)
