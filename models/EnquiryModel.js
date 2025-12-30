import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema({
  enquiryName: { type: String, required: true },
  enquiryEmail: { type: String, required: true },
  enquiryPhone: { type: String, required: true },
  enquiryState: { type: String },
  enquiryCity: { type: String },
  enquiryProgram: { type: String },
  enquiryCourse: { type: String },
  enquiryIsMarked: { type: Boolean, default: false }
})

export const enquiryModel = mongoose.model('Enquiry', EnquirySchema)
