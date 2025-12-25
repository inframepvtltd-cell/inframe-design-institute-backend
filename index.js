const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const { websiteRoute } = require('./routes/website/webRoutes')
const connectDB = require('./configs/dbConfig')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Inframe Design Institute Backend is running')
})


const allowedOrigins = [
    'https://www.inframedesigninstitute.com',
    'https://design-institute.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',

    // 'https://inframe-design-admin.vercel.app',
    // 'https://design-institute.vercel.app',
    // 'http://localhost:3000',
    // 'http://localhost:3001',
    // 'http://72.60.206.137:9200'
];



app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Postman ya server side requests
        // Normalize origin by removing 'www.' and lowercasing
        const normalize = o => o.replace(/^https?:\/\/(www\.)?/, '').toLowerCase();
        const allowed = allowedOrigins.some(o => normalize(o) === normalize(origin));
        callback(allowed ? null : new Error('Not allowed by CORS'), allowed);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));




app.use('/web', websiteRoute)

connectDB().then(async () => {
    app.listen(process.env.PORT || 9200, '0.0.0.0', () => {
        console.log(`✅ Server running on port ${process.env.PORT}`)
    })
})


