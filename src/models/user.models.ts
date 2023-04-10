import { Schema, model } from 'mongoose';
import { ENUM } from '../configs/constant.configs'
import bcrypt from 'bcrypt';
const ROUNDS = +process.env.SALT_ROUNDS!
import IUser from '../interfaces/user.interfaces';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        upperCase: true,
        trim: true,
    },

    fullname: {
        type: String,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    role: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        title: [ENUM.ADMIN, ENUM.SELLER, ENUM.BUYER],
        default: ENUM.BUYER,
    },

    avatarURL: {
        type: String
    },

    imageTag: {
        type: String
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

userSchema.pre('save', async function (this, next: Function) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(ROUNDS)
    this.password = await bcrypt.hash(this.password, salt)

})
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    const user = await User.findOne({
        username: this.username
    }).select('password')
    return await bcrypt.compare(enteredPassword, user!.password)
}


// userSchema.plugin(passportLocalMongoose);
const User = model<IUser>('user', userSchema);
export default User