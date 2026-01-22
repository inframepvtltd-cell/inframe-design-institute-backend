// // singlePageServer.js
// import express from 'express';
// import mongoose from 'mongoose';

// const app = express();
// const PORT = 8100;

// // 1️⃣ MongoDB connection
// const MONGO_URI="mongodb+srv://Design:Design123@design.yzhho6s.mongodb.net/inframe-design-institute?retryWrites=true&w=majority"


// mongoose.connect(MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//     console.log("Connected DB:", mongoose.connection.db.databaseName);
//   });


// // 2️⃣ Slider Schema & Model
// const sliderSchema = new mongoose.Schema({
//   sliderImage: String,
//   sliderHeadlineFirst: String,
//   sliderHeadlineSecond: String,
//   sliderDescription: String
// });

// const sliderModel = mongoose.model('sliders', sliderSchema, 'sliders'); // explicit collection name

// // 3️⃣ Route to fetch sliders
// app.get('/sliders', async (req, res) => {
//   try {
//     const data = await sliderModel.find();
//     res.send({
//       status: 1,
//       msg: 'Slider data fetched successfully',
//       SliderData: data
//     });
//   } catch (err) {
//     res.send({
//       status: 0,
//       msg: 'Failed to fetch slider data',
//       error: err.message
//     });
//   }
// });

// // 4️⃣ Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
