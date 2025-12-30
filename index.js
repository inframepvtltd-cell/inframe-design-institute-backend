import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import { websiteRoute } from './routes/website/webRoutes.js'
import connectDB from './configs/dbConfig.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Inframe Design Institute Backend is running')
})

console.log('Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Key Secret:', process.env.RAZORPAY_KEY_SECRET);

const allowedOrigins = [
    'https://www.inframedesigninstitute.com',
    'https://design-institute.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
]

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true) // Postman or server-side requests
            // Normalize origin by removing 'www.' and lowercasing
            const normalize = (o) => o.replace(/^https?:\/\/(www\.)?/, '').toLowerCase()
            const allowed = allowedOrigins.some((o) => normalize(o) === normalize(origin))
            callback(allowed ? null : new Error('Not allowed by CORS'), allowed)
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    })
)

app.use('/web', websiteRoute)

connectDB().then(async () => {
    app.listen(process.env.PORT || 9200, '0.0.0.0', () => {
        console.log(`✅ Server running on port ${process.env.PORT || 9200}`)
    })
})
