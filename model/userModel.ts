import { Document, model, Schema, Types } from "mongoose";

interface iUser {
  email?: string;
  name?: string;
  token?: string;
  password?: string;
  verified?: boolean;
  products: {}[];
}
interface iUserData extends iUser, Document {}
const userModel = new Schema<iUserData>(
  {
    email: { type: String, trim: true, toLowercase: true },
    name: { type: String },
    password: { type: String },
    token: { type: String },
    verified: { type: Boolean, default: false },
    products: [
      {type: Types.ObjectId, ref: "products"}
    ]
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
