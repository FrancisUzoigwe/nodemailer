import { Request, Response } from "express";
import userModel from "../model/userModel";
import crypto from "crypto";
import { sendEmail } from "../config/email";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const token = crypto.randomBytes(4).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email,
      token,
      name,
      password: hashed,
    });
    sendEmail(user);
    return res.status(201).json({
      message: "Success",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const viewAll = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: `Viewing ${users.length} user(s) on the platform`,
      data: users,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Accounts can't be seen",
      data: error?.message,
    });
  }
};

export const verifyAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    if (user) {
      const realUser = await userModel.findByIdAndUpdate(user?._id, {
        verified: true,
        new: true,
      });
      return res.status(200).json({
        message: "Successfully verified",
        data: realUser,
      });
    } else {
      return res.status(400).json({
        message: "Error verifying user",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while verifying account",
      data: error?.message,
    });
  }
};

export const viewOneAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "Viewing one user account",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while viewing one account",
      data: error?.message,
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findByIdAndDelete(userID);
    return res.status(201).json({
      message: "Successfully deleted",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while deleting account",
      data: error?.message,
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user?.password!);
      if (check) {
        return res.status(200).json({
          message: "Signed in successfully",
          data: user,
        });
      } else {
        return res.status(400).json({
          message: "Password Error!!",
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};
