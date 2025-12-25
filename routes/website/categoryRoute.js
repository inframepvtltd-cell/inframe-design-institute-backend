const express = require('express')
const { fetchOnlineCategory, fetchOfflineCategory } = require('../../controllers/website/courseController')


const categoryRoute = express.Router()

categoryRoute.get('/fetch-online-category', fetchOnlineCategory)
categoryRoute.get('/fetch-offline-category', fetchOfflineCategory)



module.exports = { categoryRoute }