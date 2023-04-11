import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import passport from './middlewares/passport.middleware';
import cors from 'cors';
import { PORT } from './configs/constant.configs';
import database from './configs/database.configs';
import router from "./routes/index.routes"
import sessionMiddleware from './middlewares/sessions.middleware';

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());



app.use('/api', router);

app.listen(PORT, () => {
    console.log('...server connected');
    database()
});