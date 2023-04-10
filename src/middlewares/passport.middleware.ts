import { Request, Response } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'
import UserModel from '../models/user.models'

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async (username, password, done) => {

            // check if the user exists or not
            const user = await UserModel.findOne({ username })

            //check if the credential is valid or not
            //@ts-ignore
            if (user && (await user.comparePassword(password))) {
                done(null, user)
            }
            else done(null, false)
        }
    )
)

passport.serializeUser((user: any, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (req: Request, id: string, done: any) => {
    try {
        const user = await UserModel.findById(id)
        done(null, user)
    }
    catch (err) {
        done(`we have an error: ${err}`)
    }
})

export default passport