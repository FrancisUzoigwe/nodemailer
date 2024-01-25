import { Document, model, Schema, Types } from "mongoose";

interface iProduct {
  name: string;
  image: string;
  imageID: string;
  price: number;
  userID:string;
}

interface iProductData extends iProduct, Document {}
const productModel = new Schema<iProductData>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    imageID: { type: String },
    price: { type: Number,required: true },
    userID: {type:String},
  },
  { timestamps: true }
);

export default model<iProductData>("products", productModel);
