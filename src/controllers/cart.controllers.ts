import { Request, Response } from 'express';
import cartServices from '../services/cart.services';
const { addtoCart, removefromCart, getAllItems } = new cartServices();
import { MESSAGES } from '../configs/constant.configs';


class cartController {
    //add item to cart
    async addItem(req: Request, res: Response) {
        try {
            const { product_id } = req.body
            const item = await addtoCart(product_id)
            res.status(201).send({
                success: true,
                message: MESSAGES.CART.ADDED,
                data: item
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.CART.ERROR + error
            })
        }
    }

    async deleteItem(req: Request, res: Response) {
        try {
            const { id } = req.body
            await removefromCart(id)
            res.status(200).send({
                success: true,
                message: MESSAGES.CART.REMOVED,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.CART.ERROR + error
            })
        }

    }

    async displayItems(req: Request, res: Response) {
        try {
            const cart = await getAllItems()
            if (Object.keys(cart).length === 0) {
                res.status(200).send({
                    success: true,
                    message: MESSAGES.CART.NO_ITEMS,
                    data: cart
                })
            }
            res.status(200).send({
                success: true,
                message: MESSAGES.CART.ITEMS,
                data: cart
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.CART.ERROR + error
            })
        }
    }
}

export default new cartController()