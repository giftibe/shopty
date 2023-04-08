import express from 'express';
const router = express.Router();
import userControllers from '../controllers/user.controllers';
const { registerUser, loginUser } = userControllers


router.post('/register', registerUser)
router.post('/login', loginUser)

export default router