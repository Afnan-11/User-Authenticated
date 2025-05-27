import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MongoDB_URI)
    console.log('Database Connected Successfully'.bgCyan)
  } catch (error) {
    console.log('DB connection failed...'.bgRed, error)
  }
}
