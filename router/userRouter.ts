import express from "express";
import { registerUser, view } from "../controller/userController";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/view").get(view);

export default router;
