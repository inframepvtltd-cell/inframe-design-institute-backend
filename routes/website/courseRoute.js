import express from 'express';
import { onlineCourseView, offlineCourseView } from '../../controllers/website/courseController.js';

const courseRoute = express.Router();

courseRoute.get('/view-online', onlineCourseView);
courseRoute.get('/view-offline', offlineCourseView);

export { courseRoute };
