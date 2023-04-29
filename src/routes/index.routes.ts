import { Router } from 'express';
const router = Router();
import userRouter from './user.routes';
import productRouter from './product.route';
import categoryRouter from './category.routes'

router.use('/v1/users', userRouter)
router.use('/v1/product', productRouter)
router.use('/v1/category', categoryRouter)
export default router