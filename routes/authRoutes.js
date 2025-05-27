import express from 'express'
import {
  loginController,
  registerController,
} from '../controllers/authController.js'

// import authCntroller from '../controllers/authController.js'

const router = express.Router()

// POST Register
router.post('/register', registerController)

// POST lOGIN
router.post('/login',  loginController)

export default router
