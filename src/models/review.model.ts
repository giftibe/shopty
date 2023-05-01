import { model, Schema, } from 'mongoose'

const reviewSchema = new Schema({
    reviews: {
        content: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        author: {
            user: Schema.Types.ObjectId,
            ref: 'User',
        },
        product_id: {
            order: Schema.Types.ObjectId,
            ref: 'Product'
        },

        isDeleted: Boolean,
        default: false
    }
},
    { timestamps: true })

const Review = model('review', reviewSchema)
export default Review