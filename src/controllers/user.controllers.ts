import { Request, Response } from "express";
import UserServices from "../services/user.services";
const ROUNDS = +process.env.SALT_ROUNDS!
import encrypt from "../utils/hash.utils";
import { MESSAGES } from "../configs/constant.configs";
const { registerUser, findEmail, updateUser, deleteUser, findUserName } = new UserServices();


class userControllers {
    async registerUser(req: Request, res: Response) {
        try {
            const { password } = req.body
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
            const getUserName = await findUserName(req.body.userName)
            if (getUserName) {
                return res.status(409).send(
                    {
                        success: false,
                        message: MESSAGES.USER.DUPLICATE_USERNAME
                    })
            }

            //Register a user 

            const data = await encrypt(req.body.password, ROUNDS)
            await registerUser({
                password: data,
                ...req.body
            })

            res.status(201).send({
                success: true,
                message: MESSAGES.USER.CREATED
            })
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

            //check if passwords match
            if (emailCheck.password == req.body.password) {
                //compare hashed password here then:
                return res.status(403).send({
                    success: false,
                    message: MESSAGES.USER.PASSWORD_NOTFOUND
                })
            }

            //Login in the user
            //create cookie here then login

            return res.status(200).send({
                success: true,
                message: MESSAGES.USER.LOGIN
            })


        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR + error
            })
        }
    }

    async updateAccount(req: Request, res: Response) {
        try {
            const data = req.body
            let account

            /*check if logged in user is an admin or their email matches
            the logged in email */
            // const _user = await findEmail(account)

            // const update = await updateUser()



        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR + error
            })

        }


    }




}



export default new userControllers()
