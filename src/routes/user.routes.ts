import express from 'express';
const router = express.Router();
import userControllers from '../controllers/user.controllers';
const { registerUser, loginUser, findAUsername, logoutUser } = userControllers


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/find', findAUsername)
router.delete('/logout', logoutUser)

export default router