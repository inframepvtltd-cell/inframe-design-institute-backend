import express from 'express';
import {
  enquiryAdd,
  enquiryCityView,
  enquiryStateView,
  bookSession,
} from '../../controllers/website/EnquiryController.js';

const EnquiryRoute = express.Router();

EnquiryRoute.post('/add', enquiryAdd);
EnquiryRoute.get('/view-places', enquiryCityView);
EnquiryRoute.get('/state-view', enquiryStateView);
EnquiryRoute.post('/book-session', bookSession);

export { EnquiryRoute };
