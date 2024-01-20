import { Document, Schema, model } from "mongoose";

interface iUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  token?: string;
  verified?: boolean;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    token: { type: String },
    verified: { type: Boolean },
    email: { type: String, unique: false },
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
