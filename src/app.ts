import express from 'express';
import session from "express-session";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { PORT } from './configs/constant.configs';
import database from './configs/database.configs';
import passport from 'passport';

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({ 
    secret: process.env.SESSION_KEY!,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.listen(PORT, () => {
    console.log('server connected...');
    database()
});