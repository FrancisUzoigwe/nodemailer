import { Router } from "express";
import {
  registerUser,
  verifyAccount,
  viewAll,
} from "../controller/userController";

const router = Router();
router.route("/register").post(registerUser);
router.route("/view").get(viewAll);
router.route("/:userID/:token/verify-account").patch(verifyAccount);

export default router;
