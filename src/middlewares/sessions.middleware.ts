import { NextFunction, Request, Response } from 'express'
import MongoStore from 'connect-mongo';
import globals from '../../environment'

import session from 'express-session'

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false, 
        // cookie: { secure: true } //set true in production

        store:MongoStore.create({
            mongoUrl: process.env.DATABASE_URI

        })


    })(req, res, next)
}

export default sessionMiddleware