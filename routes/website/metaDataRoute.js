import express from 'express';
import { metaDataFetchOffline, metaDataFetchOnline, metaDataFetchStudyMaterial } from '../../controllers/website/metaDataController.js';

const metaDataRoute = express.Router();

metaDataRoute.get('/fetch-online/:slug', metaDataFetchOnline);
metaDataRoute.get('/fetch-offline/:slug', metaDataFetchOffline);

metaDataRoute.get('/fetch-study-material/:slug',metaDataFetchStudyMaterial)

export { metaDataRoute };
