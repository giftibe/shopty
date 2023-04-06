import express from 'express';
const app = express();
import router from './user.routes';

export default app.use('/v1', router)