import IProduct from "../interfaces/product.interface";
import Product from "../models/product.model";


export default class productService {
    //create a product
    async createProduct(data: Partial<IProduct>) {
        return await Product.create(data)
    }

    //delete a product for admins and sellers
    async deleteProduct(id: string) {
        return await Product.findOneAndUpdate(
            { id, isDeleted: false },
            { isDeleted: true })
    }

    //update a product for sellers
    async updateProduct(id: string, data: Partial<IProduct>) {
        return await Product.findOneAndUpdate(
            { id, isDeleted: false },
            data,
            { new: true }).sort({ createdAt: -1 });
    }

    //find products with name for buyer
    async findProductByName(product_name: Partial<IProduct>) {
        return await Product.find(
            { product_name, isDeleted: false })
            .sort({ createdAt: -1 });
    }

    //find a product: find all products with seller id
    async findProductsBySellerName(seller: Partial<IProduct>) {
        return await Product.find(
            { seller, isDeleted: false })
            .sort({ createdAt: -1 });
    }

    //find product by Id
    async findProductsById(id: string) {
        return await Product.find(
            { id, isDeleted: false })
    }

    //find all product
    async findAllProducts() {
        return await Product.find({ isDeleted: false })
    }
}

