import express from 'express';
const router = express.Router();
import userControllers from '../controllers/user.controllers';
import requireRole from '../middlewares/authorize.passport';
const { registerAUser, loginUser, findAUsername, logoutUser } = userControllers


router.post('/register', registerAUser)
router.post('/login', loginUser)
router.get('/find', requireRole('admin'), findAUsername)
router.delete('/logout', logoutUser)

export default router