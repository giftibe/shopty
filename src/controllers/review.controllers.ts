import { Request, Response } from 'express';
import reviewServices from '../services/review.services';
import { MESSAGES } from '../configs/constant.configs';
const { createReview, fetchAProductReview, deleteReviewByAdminOnly } =
    new reviewServices();

class reviewController {
    //create reviews
    async createAReview(req: Request, res: Response) {
        try {
            const data = req.body;
            const review = await createReview(data);
            res.status(200).send({
                success: true,
                message: MESSAGES.REVIEW.SUBMITTED,
                data: review,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.REVIEW.ERROR + error,
            });
        }
    }

    //fetch a product's review
    async fetchProductReviews(req: Request, res: Response) {
        try {
            const { product_id } = req.body;
            const fetchRequest = await fetchAProductReview(product_id);
            //@ts-ignore
            let result = fetchRequest.reviews;
            if (result) {
                res.status(200).send({
                    success: true,
                    message: MESSAGES.REVIEW.FETCHED,
                    result,
                });
            } else {
                res.status(401).send({
                    success: true,
                    message: MESSAGES.REVIEW.EMPTY,
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.REVIEW.ERROR + error,
            });
        }
    }

    //delete a review
    async deleteReview(req: Request, res: Response) {
        try {
            const { review_id } = req.body;
            await deleteReviewByAdminOnly(review_id);
            res.status(201).send({
                success: true,
                message: MESSAGES.REVIEW.DELETED,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: MESSAGES.REVIEW.ERROR + error,
            });
        }
    }
}
