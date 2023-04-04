import { model, Schema, } from 'mongoose'

const reviewSchema = new Schema({
    review: [{
        content: String,
        trim: true,
        author: {
            user: Schema.Types.ObjectId,
            ref: 'User',
        },
        product: {
            order: Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]

})

const Review = model('review', reviewSchema)
export default Review