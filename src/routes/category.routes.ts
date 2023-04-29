import express from 'express'
const router = express.Router()
import requireRole from '../middlewares/authorize.passport';
import categoryControllers from '../controllers/category.controllers'
const {
    createACategory,
    deleteACategory,
    updateACategory
} = categoryControllers

router.post('/create', requireRole('admin'), createACategory)
router.delete('/delete', requireRole('admin'), deleteACategory)
router.put('/update', requireRole('admin'), updateACategory)

export default router