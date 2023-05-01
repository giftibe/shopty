import Review from "../models/review.model";
import Product from "../models/product.model";
import IReview from "../interfaces/review.interface";
import IProduct from "../interfaces/product.interface";

export default class reviewServices {
    //create a review
    async createReview(data: IReview) {
        return await Review.create(data);
    }

    //see all a products review
    async fetchAProductReview(product_id: Partial<IProduct>) {
        //id is product id, then search for the product with that id
        // then ge the product and zone into the reviews section
        const _product = await Product.find({ id: product_id, isDeleted: false }).exec()
        return _product
    }

    //delete a review by admin only
    async deleteReviewByAdminOnly(id: string) {
        return await Review.findByIdAndUpdate(
            { id, isDeleted: false },
            { isDeleted: true })
    }
}
