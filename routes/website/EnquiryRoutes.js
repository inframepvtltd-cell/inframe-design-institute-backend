const express = require('express')
const { enquiryAdd, enquiryCityView, bookSession, viewBookedSession } = require('../../controllers/website/EnquiryController')
const { enquiryStateView } = require('../../controllers/admin/AdminEnquiryController')

const EnquiryRoute = express.Router()

EnquiryRoute.post('/add', enquiryAdd)
EnquiryRoute.get('/view-places', enquiryCityView)
EnquiryRoute.get('/state-view', enquiryStateView)
EnquiryRoute.post('/book-session', bookSession)





module.exports = { EnquiryRoute }