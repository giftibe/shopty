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
    async registerAUser(req: Request, res: Response) {
        try {
            //find if email exists
            const { username } = req.body
            const getEmail = await findEmail(req.body.email)
            if (getEmail) {
                return res.status(409).send(
                    {
                        success: true,
                        message: MESSAGES.USER.DUPLICATE_EMAIL
                    })
            }

            //check if userName exist
            if (req.body.username) {
                const getUserName = await findUserName(req.body.username)
                if (getUserName) {
                    return res.status(409).send(
                        {
                            success: false,
                            message: MESSAGES.USER.DUPLICATE_USERNAME
                        })
                }
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
        catch (error: any) {
            if (error.code === 11000) {
                return res.status(409).send({
                    success: false,
                    message: "Duplicate email or username " + error
                });
            } else
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
            const { username } = req.body
            const getUsername = await findUserName(username)

            if (getUsername) {
                return res.send({
                    success: true,
                    user: getUsername,
                    message: ' MESSAGES.USER.USER_FOUND'
                })
            } else {
                return res.send({
                    success: false,
                    message: ' MESSAGES.USER.USER_!FOUND'
                })
            }
        } else {
            return res.status(401).send({
                success: false,
                message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
            })
        }
    }

    //deleting an account
    async deleteAccount(req: Request, res: Response) {
        try {
            //check if authenticated
            if (!req.isAuthenticated) {
                return res.status(401).send({
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                })
            }
            const userMail = await findEmail(req.body.email)

            //check the user acount to delete exists
            if (!userMail)
                return res.status(404).send({
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                })

            // check if the requesting user is an admin
            const user = (req.user as Partial<IUser>);
            if (user.role == 'admin') {
                await deleteUser(req.body.email)
                return res.status(204).send({
                    success: true,
                    message: MESSAGES.USER.ACCOUNT_DELETED
                })
            } else {

                // check if the requesting user is deleting their account
                if (user.email == userMail.email) {
                    await deleteUser(req.body.email)
                    return res.status(200).send({
                        success: true,
                        message: MESSAGES.USER.ACCOUNT_DELETED
                    })
                } else {
                    return res.status(409).send({
                        success: true,
                        message: MESSAGES.USER.NOT_ACCOUNT_DELETED
                    })
                }
            }
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                message: error
            });
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
            }
            else {
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