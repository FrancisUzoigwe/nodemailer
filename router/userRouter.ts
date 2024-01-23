import { Router } from "express";
import {
  deleteAccount,
  registerUser,
  signinUser,
  verifyAccount,
  viewAll,
} from "../controller/userController";

const router = Router();
router.route("/register").post(registerUser);
router.route("/view").get(viewAll);
router.route("/:userID/:token/verify-account").patch(verifyAccount);
router.route("/:userID/delete-account").delete(deleteAccount);
router.route("/signin").post(signinUser);

export default router;
