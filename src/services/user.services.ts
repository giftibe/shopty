import User from '../models/user.models';
import IUser from '../interfaces/user.interfaces';

export default class UserServices {
    //create account
    async createAccount(user: Partial<IUser>) {
        const _user = await User.create(user);
        return await User.findOne(_user.id, { _id: 1, password: 0 });
    }

    //find a useremail
    async findEmail(email: string) {
        return await User.findOne(
            { email: email, isDeleted: false },
            { _id: 1, password: 0 }
        );
    }

    //find a userName
    async findUserName(userName: string) {
        return await User.findOne(
            { userName: userName, isDeleted: false },
            { _id: 1, password: 0 }
        );
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