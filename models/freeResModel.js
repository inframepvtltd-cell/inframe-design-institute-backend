import mongoose from 'mongoose';

const freeResSchema = mongoose.Schema({
    resTitle: String,
    resDescription: String,
    resFile: String,
    resCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'resCategoryName' },
})


const freeResModel = mongoose.model('freeResource', freeResSchema)



export { freeResModel }