const express = require('express')
const { enquiryAdd, enquiryCityView, bookSession, enquiryStateView } = require('../../controllers/website/EnquiryController')

const EnquiryRoute = express.Router()

EnquiryRoute.post('/add', enquiryAdd)
EnquiryRoute.get('/view-places', enquiryCityView)
EnquiryRoute.get('/state-view', enquiryStateView)
EnquiryRoute.post('/book-session', bookSession)





module.exports = { EnquiryRoute }