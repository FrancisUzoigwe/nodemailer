import { Request, Response } from "express";
import userModel from "../model/userModel";
import productModel from "../model/productModel";
import { streamUpload } from "../config/streamifier";
import { Types } from "mongoose";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { name, price } = req.body;
    const { secure_url, public_id }: any = await streamUpload(req);
    const user = await userModel.findById(userID);
    if (user?.verified) {
      const product = await productModel.create({
        name,
        price,
        image: secure_url,
        imageID: public_id,
        userID:user.id
      });

      user?.products.push(new Types.ObjectId(product._id));
      user?.save();
      product?.save();

      return res.status(201).json({
        message: "Created successfully",
        data: product,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error.message,
    });
  }
};

export const viewAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: `Viewing ${products.length} product(s)`,
      data: products,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured ",
      data: error?.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const product = await productModel.findByIdAndDelete(productID);

    return res.status(201).json({
      message: "Deleted!!",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const populateProduct = async (req: Request, res: Response) => {
  try {
    const { sellerID } = req.params;
    const seller = await userModel.findById(sellerID);

    if (seller) {
        
      const seeSellerProducts = await productModel.findById(sellerID).populate({
        path: "products",
        options: {
          sort: { createdAt: -1 },
        },
      });
     

      return res.status(200).json({
        message: "Seller's products",
        data: seller.products,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};
