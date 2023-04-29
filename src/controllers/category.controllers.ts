import { Request, Response } from "express";
import categoryService from "../services/category.services";
const { addCategory, deleteCategory, getAllCategories, updateCategory, findCategory } = new categoryService();
import { MESSAGES } from '../configs/constant.configs'
import Category from "../models/category.model";
import { idText } from "typescript";


class categoryController {
    //create  categories by only admins
    async createACategory(req: Request, res: Response) {
        if (!req.isAuthenticated()) {
            return res.status(402).send({
                success: false,
                message: MESSAGES.CATEGORY.UNAUTHORIZED
            })
        }

        const { field } = req.body.toLowerCase()
        //check if the field category already exist
        const check = Category.findOne(field)
        if (!check) {
            const newCartegory = await addCategory(field)
            res.status(201).send({
                status: true,
                message: MESSAGES.CATEGORY.CREATED,
                data: newCartegory
            })
        } else {
            res.status(409).send({
                status: false,
                message: MESSAGES.CATEGORY.N_CREATED,
                data: check
            })
        }
    }

    //delete category
    async deleteACategory(req: Request, res: Response) {
        try {
            //check if category to delete exists
            const { id } = req.body
            const check = Category.findOne(id)
            if (!check) {
                res.status(404).send({
                    status: false,
                    message: MESSAGES.CATEGORY.ABSENT,
                })
            } else {
                await deleteCategory(id)
                res.status(204).send({
                    status: true,
                    message: MESSAGES.CATEGORY.DELETED
                })
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.CATEGORY.ERROR + error
            })
        }
    }

    async updateACategory(req: Request, res: Response) {
        try {
            //check if category to delete exists
            const { id } = req.body
            const { field } = req.body
            const check = Category.findOne(id)
            if (!check) {
                res.status(404).send({
                    status: false,
                    message: MESSAGES.CATEGORY.ABSENT,
                })
            } else {
                await updateCategory(id, field)
                res.status(200).send({
                    status: true,
                    message: MESSAGES.CATEGORY.UPDATED
                })
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.CATEGORY.ERROR + error
            })
        }
    }
}
export default new categoryController()