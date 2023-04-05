import IProduct from "../interfaces/product.interface"
import Cart from "../models/cart.model"
import ICart from "../interfaces/cart.interface"

export default class cartServices {
    //add to cart
    async addtoCart(product_id: Partial<IProduct>) {
        const _newProduct = await Cart.create({ product: product_id })
        return _newProduct
    }

    //delete from cart
    async removefromCart(id: ICart) {
        return await Cart.findByIdAndDelete(id)
    }

    //get all cart item
    async getAllItems() {
        return await Cart.find()
    }
}