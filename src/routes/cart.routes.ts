import express from 'express'
const router = express.Router()
import requireRole from '../middlewares/authorize.passport';
import cartControllers from '../controllers/cart.controllers';
const { addItem, deleteItem, displayItems } = cartControllers

router.post('/add', requireRole('seller'), addItem)
router.delete('/delete', requireRole('seller'), deleteItem)
router.get('/show', requireRole('seller'), displayItems)

export default router