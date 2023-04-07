// import mongoose from "mongoose";
export default interface IUser {
    email: string;
    username: string;
    fullname: string;
    password: string;
    role: string;
    avatarURL: string;
    imageTag: string;
    isDeleted: boolean;

}

// export default interface UserModel extends mongoose.PassportLocalModel<IUser> {};