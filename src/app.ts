import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { PORT } from './configs/configs.constant';
import database from './configs/configs.database';

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(PORT, () => {
    console.log('server connected...');
    database()
});