import express from 'express'
import {
  metaDataFetchOffline,
  metaDataFetchOnline
} from '../../controllers/website/metaDataController.js'

const metaDataRoute = express.Router()

metaDataRoute.get('/fetch-online/:slug', metaDataFetchOnline)
metaDataRoute.get('/fetch-offline/:slug', metaDataFetchOffline)

export { metaDataRoute }
