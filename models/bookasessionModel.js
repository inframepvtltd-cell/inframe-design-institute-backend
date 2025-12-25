const { default: mongoose, Schema } = require("mongoose");

const bookSessionSchema = new Schema({
    userName: String,
    userEmail: String,
    userPhone: String,
    examType: String
})

const bookSessionModel = mongoose.model('bookSession', bookSessionSchema)

module.exports = { bookSessionModel }