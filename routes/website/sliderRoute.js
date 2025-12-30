import express from 'express';
import { webSlider } from '../../controllers/website/webSliderController.js';

const sliderRoute = express.Router();

sliderRoute.get('/view', webSlider);

export { sliderRoute };
