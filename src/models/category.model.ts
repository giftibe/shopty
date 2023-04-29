import { model, Schema, } from 'mongoose'

const categorySchema = new Schema({
    field: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        minLength: 3
    }
})
const Category = model('category', categorySchema)
export default Category
