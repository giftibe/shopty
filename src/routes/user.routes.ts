import express from 'express';
const router = express.Router();
import userControllers from '../controllers/user.controllers';
const { registerUser } = userControllers


router.post('/register', registerUser)

export default router