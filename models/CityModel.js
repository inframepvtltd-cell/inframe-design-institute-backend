import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'state',
  },
  cityName: String,
});

const cityModel = mongoose.model('city', citySchema);

export { cityModel };
