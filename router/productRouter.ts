import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  populateProduct,
  viewAllProduct,
  viewOneProduct,
} from "../controller/productController";
import multer from "multer";

const upload = multer().single("image");
const router = Router();
router.route("/create-product").post(upload, createProduct);
router.route("/:productID/delete-product").delete(deleteProduct);
router.route("/view-all-products").get(viewAllProduct);
router.route("/:sellerID/populate").get(populateProduct);
router.route("/:productID/view-one-product").get(viewOneProduct);
export default router;
