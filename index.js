import './configs/env.js';
import express from 'express'
import cors from 'cors'
import { websiteRoute } from './routes/website/webRoutes.js'
import connectDB from './configs/dbConfig.js'
import { connectPostgres } from './configs/postgresconnection.js';

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const corsWhiteList = isProduction
    ? ['https://www.inframedesigninstitute.com']
    : ['http://localhost:3000', 'http://localhost:3001', 'https://www.inframedesigninstitute.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Postman ya server side requests
        // Normalize origin by removing 'www.' and lowercasing
        const normalize = o => o.replace(/^https?:\/\/(www\.)?/, '').toLowerCase();
        const allowed = corsWhiteList.some(o => normalize(o) === normalize(origin));
        callback(allowed ? null : new Error('Not allowed by CORS'), allowed);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Inframe Design Institute Backend is running')
})

app.use('/web', websiteRoute)


const PORT = process.env.PORT || 9200;

(async () => {
    try {
        // 🔹 MongoDB
        await connectDB();

        // 🔹 PostgreSQL
        await connectPostgres();

        // 🔹 Start Server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Server startup failed:', error.message);
        process.exit(1);
    }
})();