import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    verifyToken?: string | null;
    verifyTokenExpiry?: Date | null;
    forgotPasswordToken?: string | null;
    forgotPasswordTokenExpiry?: Date | null;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username must be required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "email must be required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password must be required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
        default: null,
    },

    verifyTokenExpiry: {
        type: Date,
        default: null,
    },

    forgotPasswordToken: {
        type: String,
        default: null,
    },

    forgotPasswordTokenExpiry: {
        type: Date,
        default: null,
    },
}, { timestamps: true })

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);
export default UserModel;