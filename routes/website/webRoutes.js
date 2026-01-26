import express from "express";

import { userRoutes } from "./userRoutes.js";
import { EnquiryRoute } from "./EnquiryRoutes.js";
import { categoryRoute } from "./categoryRoute.js";
import { courseRoute } from "./courseRoute.js";
import { cartRoute } from "./cartRoute.js";
import { metaDataRoute } from "./metaDataRoute.js";
import { sliderRoute } from "./sliderRoute.js";
import { razorpayRoute } from "./razorpayRoute.js";
import {
  getBlogById,
  viewAllBlogs,
  viewBlogBySlug,
} from "../../controllers/website/blogController.js";
import { freeResRoute } from "./freeResRoute.js";
import { studyMaterialRoute } from "./studyMaterialRoute.js";

const websiteRoute = express.Router();

websiteRoute.use("/user", userRoutes);
websiteRoute.use("/enquiry", EnquiryRoute);
websiteRoute.use("/category", categoryRoute);
websiteRoute.use("/course", courseRoute);
websiteRoute.use("/cart", cartRoute);
websiteRoute.use("/meta-data", metaDataRoute);
websiteRoute.use("/slider", sliderRoute);
websiteRoute.use("/razorpay", razorpayRoute);
websiteRoute.use("/free-resources", freeResRoute);
websiteRoute.use("/study-material", studyMaterialRoute);

export { websiteRoute };
