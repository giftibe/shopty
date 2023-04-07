import { Request, Response } from "express";
import UserServices from "../services/user.services";
import { MESSAGES } from "../configs/constant.configs";
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
            const getUserName = await findUserName(req.body.userName)
            if (getUserName) {
                return res.status(409).send(
                    {
                        success: false,
                        message: MESSAGES.USER.DUPLICATE_USERNAME
                    })
            }

            //Register a user 
            const _user = registerUser(req.body);
            res.status(201).send({ 
                success: true, 
                message: MESSAGES.USER.CREATED })
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.USER.ERROR + error
            })
        }
    }
}

export default new userControllers()
