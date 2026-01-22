import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    sliderImage: String, // DB में string है
    sliderHeadlineFirst: String,
    sliderHeadlineSecond: String,
    sliderDescription: String
});


const sliderModel = mongoose.model('Slider', sliderSchema, 'sliders');

export { sliderModel };
