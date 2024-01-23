import { Document, model, Schema } from "mongoose";

interface iUser {
  email?: string;
  name?: string;
  token?: string;
  password?: string;
  verified?: boolean;
}
interface iUserData extends iUser, Document {}
const userModel = new Schema<iUserData>(
  {
    email: { type: String, trim: true, toLowercase: true },
    name: { type: String },
    password: { type: String },
    token: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
