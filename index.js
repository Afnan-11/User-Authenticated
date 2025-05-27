import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors';
import { connectDB } from './db/connect.js';
// import authRouters from '../routes/authRouters.js'
import authRoutes from './routes/authRoutes.js'


connectDB()

dotenv.config()

const app = express()

app.use(express.json())

// Port = 5000

app.use('/api/v1/auth', authRoutes)

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' })
)

const PORT = process.env.PORT

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`.bgMagenta)
})
