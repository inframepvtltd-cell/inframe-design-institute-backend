import express from 'express'
import {
  fetchOnlineCategory,
  fetchOfflineCategory
} from '../../controllers/website/courseController.js'

const categoryRoute = express.Router()

categoryRoute.get('/fetch-online-category', fetchOnlineCategory)
categoryRoute.get('/fetch-offline-category', fetchOfflineCategory)

export { categoryRoute }
