import { Request, Response } from "express";
import userModel from "../model/userModel";
import productModel from "../model/productModel";
import { streamUpload } from "../config/streamifier";

export const createProduct: any = async (req: any, res: Response) => {
  try {
    const { name, price } = req.body;
    const { secure_url, public_id }: any = await streamUpload(req)
    console.log("This is :", req?.file);

    const product = await productModel.create({
      name,
      price,
      image: secure_url,
      imageID: public_id,
    });

    return res.status(201).json({
      message: "Created successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.stack,
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

export const viewOneProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const product = await productModel.findById(productID);
    return res.status(200).json({
      message: "Viewing product",
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};
