import { Request, Response, NextFunction } from "express";
import UserServices from "../services/user.services";
import passport from "../middlewares/passport.middleware";
import { MESSAGES } from "../configs/constant.configs";
import generateRandomAvatar from '../utils/avatar'
import IUser from "../interfaces/user.interfaces";
const { registerUser, findEmail, updateUser, deleteUser, findUserName } = new UserServices();


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


            const newUser = await registerUser(req.body)
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
            const { email, username } = req.body


            //check if email exist
            const user = await findUserName(username)
            const _user = user as Partial<IUser>
            console.log(user);

            if (!user || null) {
                return res.status(403).send({
                    success: false,
                    message: 'not found'
                })
            }

            passport.authenticate('local', (err: any, user: any) => {
                console.log(user);
                if (!user) return res.status(401).send({
                    message: 'username or password is incorrect'
                })

                req.login(user, (err) => {
                    if (err) throw err
                    res.status(201).send({
                        success: true,
                        message: MESSAGES.USER.LOGGEDIN,
                        user
                    })
                })
            })(req, res, next())

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR + error
            })
        }
    }

}

export default new userControllers()
