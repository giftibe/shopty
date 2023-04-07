import { Request, Response } from "express";
import UserServices from "../services/user.services";
import bcrypt from 'bcrypt'
const ROUNDS = +process.env.SALT_ROUNDS!
import { MESSAGES } from "../configs/constant.configs";
import generateRandomAvatar from '../utils/avatar'
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
                message: MESSAGES.USER.ERROR + " here is it " + error
            })
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            //check if email exist
            const emailCheck = await findEmail(req.params.email)
            if (!emailCheck) {
                return res.status(403).send({
                    success: false,
                    message: MESSAGES.USER.EMAIL_NOTFOUND
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
