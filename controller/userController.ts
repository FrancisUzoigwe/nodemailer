import { Request, Response } from "express";
import userModel from "../model/userModel";
import { verifyAccount } from "../config/email";
import crypto from "crypto";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(2).toString("hex");
    const user = await userModel.create({ email, token });

    verifyAccount(user);

    return res.status(201).json({
      message: "Account successfully created, proceed to verify",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while registering user",
      data: error?.message,
    });
  }
};

export const view = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({
      message: "Seee use",
      data: users,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error",
      data: error?.message,
    });
  }
};
