import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSessionSchema = new Schema({
  userName: String,
  userEmail: String,
  userPhone: String,
  examType: String,
});

const bookSessionModel = mongoose.model(
  'bookSession',
  bookSessionSchema
);

export { bookSessionModel };
