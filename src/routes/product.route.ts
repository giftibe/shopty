import express from "express";
const router = express.Router();
import requireRole from '../middlewares/authorize.passport';
import productControllers from "../controllers/product.controllers";
const {
    saveProduct,
    searchProduct,
    deleteProduct,
    updateProduct
} = productControllers;

router.post('/save', requireRole('seller'), saveProduct)
router.get('/find', searchProduct)
router.post('/update', requireRole('seller'), updateProduct)
router.delete('/delete/:id', requireRole('seller' || 'admin'), deleteProduct)


export default router