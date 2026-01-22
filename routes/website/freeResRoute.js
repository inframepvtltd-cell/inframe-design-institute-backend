import express from 'express'
import { viewAllCategories, viewAllFreeRes, viewCategoryData } from '../../controllers/website/freeResController.js'

const freeResRoute = express.Router()

freeResRoute.get('/view-res', viewAllFreeRes)
freeResRoute.get('/view-categories', viewAllCategories)
freeResRoute.post('/category/:id', viewCategoryData)



export { freeResRoute }