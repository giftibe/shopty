import mongoose from "mongoose";
export default interface IUser {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    role: string;
    avatarUrl: string;
    imageTag: string;
    isDeleted: boolean;

}

export default interface UserModel extends mongoose.PassportLocalModel<IUser> {};