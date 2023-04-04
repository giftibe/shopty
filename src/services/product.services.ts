import IProduct from "../interfaces/product.interface";
import Product from "../models/product.model";


class productService {
    //create a product
    async createProduct(data: Partial<IProduct>) {
        return await Product.create(data)
    }

    //delete a product for admins and sellers
    async deleteProduct(product_name: Partial<IProduct>) {
        return await Product.findOneAndUpdate(
            { product_name: product_name, isDeleted: true },
            { isDeleted: true })
    }

    //update a product for sellers
    async updateProduct(product_name: Partial<IProduct>, data: Partial<IProduct>) {
        return await Product.findOneAndUpdate(
            { product_name, isDeleted: false },
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
}

export default productService