import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  populateProduct,
  viewAllProduct,
} from "../controller/productController";
import multer from "multer";

const upload = multer().single("image");
const router = Router();
router.route("/:userID/create-product").post(upload, createProduct);
router.route("/:productID/delete-product").delete(deleteProduct);
router.route("/view-all-products").get(viewAllProduct);
router.route("/:sellerID/populate").get(populateProduct);
export default router;
