import express from 'express'
import { viewMetaDataStudyMaterials, viewStudyMaterialCategories, viewStudyMaterials } from '../../controllers/website/studyMaterialController.js';

const studyMaterialRoute = express.Router()

studyMaterialRoute.get('/view-categories', viewStudyMaterialCategories)
studyMaterialRoute.get('/view-all', viewStudyMaterials)
studyMaterialRoute.get('/meta-data/:slug',viewMetaDataStudyMaterials)


export { studyMaterialRoute };
