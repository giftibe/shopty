import { Request, Response } from 'express'
import { MESSAGES } from '../configs/constant.configs'
import IUser from '../interfaces/user.interfaces'
import productService from '../services/product.services'
const {
    createProduct,
    findAllProducts,
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

            //for all product that contains <search> in its product_name 
            //@ts-ignore
            const data = Products.filter(product => product.product_name! == search)
            if (data) {
                return res.status(201).send({
                    success: true,
                    message: MESSAGES.PRODUCT.RETRIEVED,
                    data
                })
            } else {
                return res.status(402).send({
                    success: false,
                    message: MESSAGES.PRODUCT.NO_ITEM
                })
                
            }

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


    }


    //delete a product
    async deleteProduct(req: Request, res: Response) {


    }


    //view product review
    async viewProductReview(req: Request, res: Response) {


    }

}

export default new productController()
