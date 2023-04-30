import { Request, Response } from 'express'
import { MESSAGES } from '../configs/constant.configs'
import IUser from '../interfaces/user.interfaces'
import IProduct from '../interfaces/product.interface'
import productService from '../services/product.services'
import { isValidObjectId } from 'mongoose'
const {
    createProduct,
    findAllProducts,
    findProductsById,
    deleteProduct,
    updateProduct,
    findProductByName,
    findProductsBySellerName
} = new productService()


class productController {

    //create a product - only accessible buy sellers
    async saveProduct(req: Request, res: Response) {
        try {
            if (!req.isAuthenticated()) {
                return res.status(402).send({
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                })
            }

            //allows only sellers to upload their products
            const user = (req.user as Partial<IUser>);
            if (user.role !== 'seller') {
                return res.status(409).send({
                    success: false,
                    message: MESSAGES.PRODUCT.UNAUTHORIZED
                })
            }
            const product = req.body
            await createProduct(product)
            return res.status(200).send({
                success: true,
                message: MESSAGES.PRODUCT.ADDED
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.PRODUCT.ERROR + error
            })
        }

    }


    //buyer: search for a product by name which return all products containing that name
    async searchProduct(req: Request, res: Response) {
        try {
            if (!req.isAuthenticated()) {
                return res.status(402).send({
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                })
            }

            const search = req.body.product_name.toLowerCase()
            //find all products
            const Products = await findAllProducts()
            Products.filter((product) => {
                //@ts-ignore
                let pName = product.product_name
                if (pName.includes(search)) {
                    return res.status(201).send({
                        success: true,
                        message: MESSAGES.PRODUCT.RETRIEVED,
                        pName
                    })
                } else {
                    return res.status(402).send({
                        success: false,
                        message: MESSAGES.PRODUCT.NO_ITEM
                    })
                }
            })
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.PRODUCT.ERROR + error
            })
        }
    }


    //update a product
    async updateProduct(req: Request, res: Response) {
        try {
            if (!req.isAuthenticated()) {
                return res.status(402).send({
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                })
            }

            const { id } = req.params
            const update = req.body
            //search for the product to update
            const product = await findProductsById(req.body.id)
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: MESSAGES.PRODUCT.NO_ITEM
                })
            }
            await updateProduct(id, update)
            return res.status(204).send({
                success: true,
                message: MESSAGES.PRODUCT.UPDATED
            })

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.PRODUCT.ERROR + error
            })
        }
    }

    //delete a product
    async deleteProduct(req: Request, res: Response) {
        try {
            if (!req.isAuthenticated()) {
                return res.status(402).send({
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                })
            }
            const { id } = req.params
            const product = await findProductsById(id)
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: MESSAGES.PRODUCT.NO_ITEM
                })
            }
            await deleteProduct(id)
            return res.status(204).send({
                success: true,
                message: MESSAGES.PRODUCT.DELETED
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.PRODUCT.ERROR + error
            })
        }
    }

    //view product review
    async viewProductReview(req: Request, res: Response) {
        try {
            if (!req.isAuthenticated()) {
                return res.status(402).send({
                    success: false,
                    message: MESSAGES.USER.ACCOUNT_NOT_REGISTERED
                })
            }
            const allProducts = await findAllProducts()
            return res.status(200).send({
                success: true,
                message: MESSAGES.PRODUCT.RETRIEVED,
                allProducts

            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: MESSAGES.PRODUCT.ERROR + error
            })
        }
    }
}

export default new productController()
