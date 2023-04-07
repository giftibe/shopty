import express from 'express';
// import session from "express-session";
// import passport from 'passport';
// import passportLocalMongoose from 'passport-local-mongoose'
// import User from './models/user.models';
// import passportLocal from 'passport-local';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import { PORT } from './configs/constant.configs';
import database from './configs/database.configs';
import router from "./routes/index.routes"

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(session({
//     secret: process.env.SESSION_KEY!,
//     resave: false,
//     saveUninitialized: false
// }))

// app.use(passport.initialize())
// app.use(session())

app.use('/api', router);

// passport.use(User.createStrategy())

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.listen(PORT, () => {
    console.log('server connected...');
    database()
});