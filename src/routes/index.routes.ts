import { Router } from 'express';
const router = Router();
import userRouter from './user.routes';
import productRouter from './product.route';
import categoryRouter from './category.routes'
import cartRouter from './cart.routes';

router.use('/v1/user', userRouter)
router.use('/v1/product', productRouter)
router.use('/v1/category', categoryRouter)
router.use('/v1/cart', cartRouter)
export default router