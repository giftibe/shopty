import { Request, Response } from "express";
import passport from "passport";

import User from "../models/user.models";
import UserServices from "../services/user.services";
import { MESSAGES } from "../configs/constant.configs";
import { create } from "ts-node";
const { createAccount, findEmail, updateUser, deleteUser, findUserName } = new UserServices();


class userControllers {
    async registerUser(req: Request, res: Response) {
        try {
            //find if email exists
            const { email, userName } = req.body
            const data = req.body

            const getEmail = await findEmail(email)
            if (getEmail) {
                return res.status(409).send(
                    {
                        success: true,
                        message: MESSAGES.USER.DUPLICATE_EMAIL
                    })
            }

            //check if userName exist
            const getUserName = await findUserName(userName)
            if (getUserName) {
                return res.status(409).send(
                    {
                        success: true,
                        message: MESSAGES.USER.DUPLICATE_USERNAME
                    })
            }

            //Register a user 
            User.register(await createAccount({
                email: req.body.email,
                userName: req.body.username,
                fullName: req.body.fullName,
                // avatarUrl: avatarURL,
                // imagTag: ImageTag.
            }), (req.body.password), (err) => {
                if (err) {
                    return res.status(400).send(err.message);
                }
                res.send('Registered successfully');
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR
            })
        }
    }
}

export default new userControllers()
