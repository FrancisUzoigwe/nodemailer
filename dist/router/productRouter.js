"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const router = (0, express_1.Router)();
router.route("/create-product").post(upload, productController_1.createProduct);
router.route("/:productID/delete-product").delete(productController_1.deleteProduct);
router.route("/view-all-products").get(productController_1.viewAllProduct);
router.route("/:sellerID/populate").get(productController_1.populateProduct);
router.route("/:productID/view-one-product").get(productController_1.viewOneProduct);
exports.default = router;
