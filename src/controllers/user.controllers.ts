import { Request, Response } from "express";
import UserServices from "../services/user.services";
import User from '../models/user.models'
import bcrypt from 'bcrypt'
const ROUNDS = +process.env.SALT_ROUNDS!
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
            //
            const salt = await bcrypt.genSalt(ROUNDS);
            const hashedPassword = await bcrypt.hash(
                req.body.password,
                salt
            );

            const avatar = generateRandomAvatar(req.body.email);
            let strAvatar = (await avatar).toString();
            let _imageTag = `<img src="${strAvatar}" alt="A representation of the user as an avatar using the email.">`;


            await registerUser({
                email: req.body.email,
                username: req.body.username,
                fullname: req.body.fullname,
                password: hashedPassword,
                avatarURL: strAvatar,
                imageTag: _imageTag,
            })

            return res.status(200).send({
                message: MESSAGES.USER.CREATED,
                success: true,
                result: {
                    email: req.body.email,
                    username: req.body.username,
                    fullname: req.body.fullname,
                    avatarURL: strAvatar,
                    imageTag: _imageTag,
                }
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR + error
            })
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            //check if email exist
            const { email } = req.body
            const { password } = req.body
            const user = await findEmail(email)
            const _user = user as Partial<IUser>

            if (!user || null) {
                return res.status(403).send({
                    success: false,
                    message: MESSAGES.USER.EMAIL_NOTFOUND
                })
            }

            const match_Password = await bcrypt.compare(password, _user.password!)
            if (!match_Password) {
                return res.status(403).send({
                    succcess: true,
                    message: MESSAGES.USER.W_PASSWORD
                })
            }
            return res.status(200).send({
                success: true,
                message: MESSAGES.USER.LOGGEDIN
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR + error
            })
        }
    }



}

export default new userControllers()
