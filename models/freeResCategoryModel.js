import mongoose from 'mongoose';

const freeResCategorySchema = new mongoose.Schema({
    resCategoryName: String
});

const freeResCategoryModel = mongoose.model('freeResCategory', freeResCategorySchema);

export {freeResCategoryModel}