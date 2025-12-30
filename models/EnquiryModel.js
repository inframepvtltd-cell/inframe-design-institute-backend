import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  enquiryName: String,
  enquiryEmail: String,
  enquiryPhone: String,
  enquiryState: String,
  enquiryCity: String,
  enquiryProgram: String,
  enquiryCourse: String,
  enquiryIsMarked: Boolean,
});

const enquiryModel = mongoose.model('enquiry', EnquirySchema);

export { enquiryModel };
