import { Request, Response, NextFunction } from "express";
import UserServices from "../services/user.services";
import passport from "../middlewares/passport.middleware";
import { MESSAGES } from "../configs/constant.configs";
import generateRandomAvatar from '../utils/avatar'
import IUser from "../interfaces/user.interfaces";
const {
    registerUser,
    findEmail,
    updateUser,
    deleteUser,
    findUserName
} = new UserServices();


class userControllers {
    async registerUser(req: Request, res: Response) {
        try {
            //find if email exists
            const getEmail = await findEmail(req.body.email)
            if (getEmail) {
                return res.status(409).send(
                    {
                        success: true,
                        message: MESSAGES.USER.DUPLICATE_EMAIL
                    })
            }

            //check if userName exist
            const getUserName = await findUserName(req.body.username)
            if (getUserName) {
                return res.status(409).send(
                    {
                        success: false,
                        message: MESSAGES.USER.DUPLICATE_USERNAME
                    })
            }

            const avatar = generateRandomAvatar(req.body.email);
            let strAvatar = (await avatar).toString();
            let _imageTag = `<img src="${strAvatar}" alt="A representation of the user as an avatar using the email.">`;


            const newUser = await registerUser({
                avatarURL: strAvatar,
                imageTag: _imageTag,
                ...req.body
            })
            return res.status(200).send({
                success: true,
                message: MESSAGES.USER.CREATED,
                newUser
            })

        }
        catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR + error
            })
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.body

            //check if username  exist
            const user = await findUserName(username)
            if (!user || null) {
                return res.status(403).send({
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                })
            }

            passport.authenticate('local', (err: any, user: any) => {
                if (!user) return res.status(401).send({
                    success: false,
                    message: MESSAGES.USER.INCORRECT_DETAILS
                })

                req.login(user, (err) => {
                    if (err) {
                        return res.send({
                            message: `an error occured ${err}`
                        })
                    }
                    res.status(201).send({
                        success: true,
                        message: MESSAGES.USER.LOGGEDIN,
                        user
                    })
                })
            })(req, res, next)

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR + error
            })
        }
    }

    async findAUsername(req: Request, res: Response) {
        if (req.isAuthenticated()) {
            return res.send({
                success: true,
                sessionId: req.sessionID,
                user: req.user,
                message: MESSAGES.USER.LOGGEDIN
            })
        } else {
            return res.send({
                success: false,
                message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
            })
        }
    }

    async logoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.isAuthenticated()) {
                req.logout(function (err) {
                    if (err) {
                        return next(err);
                    }
                    req.session.destroy(function (err) {
                        if (err) {
                            return next(err);
                        } else {
                            res.clearCookie('connect.sid')
                            return res.status(204).send({
                                success: true,
                                message: MESSAGES.USER.LOGGEDOUT
                            })
                        }
                    })

                });

            } else {
                return res.status(407).send({
                    success: false,
                    message: MESSAGES.USER.REGISTERED
                })
            }
        } catch (err) {
            // Handle any errors that occur during log out
            return res.status(500).send({
                success: false,
                message: err
            });
        }
    }

}

export default new userControllers()
