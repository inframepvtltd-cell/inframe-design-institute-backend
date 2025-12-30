import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    sliderImage: Object,
    sliderHeadlineFirst: String,
    sliderHeadlineSecond: String,
    sliderDescription: String
});

const sliderModel = mongoose.model('slider', sliderSchema);

export { sliderModel };
