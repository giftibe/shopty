import User from '../models/user.models';
import IUser from '../interfaces/user.interfaces';

export default class UserServices {
    //create account
    async registerUser(data: Partial<IUser>) {
        return await User.create(data);
    }

    //find a useremail
    async findEmail(email: string) {
        return await User.findOne(
            { email: email, isDeleted: false },
        );
    }

    //find a userName
    async findUserName(userName: string) {
        const __username = await User.findOne(
            { userName: userName, isDeleted: false },
        );
        return __username

    }

    //update a username for users
    async updateUser(user: Partial<IUser>, data: Partial<IUser>) {
        return await User.findOneAndUpdate(user, data,
            { new: true }).select('password');
    }

    //delete a user for admins
    async deleteUser(email: Partial<IUser>) {
        return await User.findOneAndUpdate(
            { email: email, isDeleted: false, },
            { isDeleted: true }
        );
    }

}