"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewOneProduct = exports.populateProduct = exports.deleteProduct = exports.viewAllProduct = exports.createProduct = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const productModel_1 = __importDefault(require("../model/productModel"));
const streamifier_1 = require("../config/streamifier");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        const { secure_url, public_id } = yield (0, streamifier_1.streamUpload)(req);
        console.log("This is :", req === null || req === void 0 ? void 0 : req.file);
        const product = yield productModel_1.default.create({
            name,
            price,
            image: secure_url,
            imageID: public_id,
        });
        return res.status(201).json({
            message: "Created successfully",
            data: product,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured",
            data: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
});
exports.createProduct = createProduct;
const viewAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: `Viewing ${products.length} product(s)`,
            data: products,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured ",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.viewAllProduct = viewAllProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const product = yield productModel_1.default.findByIdAndDelete(productID);
        return res.status(201).json({
            message: "Deleted!!",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
const populateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sellerID } = req.params;
        const seller = yield userModel_1.default.findById(sellerID);
        if (seller) {
            const seeSellerProducts = yield productModel_1.default.findById(sellerID).populate({
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
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.populateProduct = populateProduct;
const viewOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const product = yield productModel_1.default.findById(productID);
        return res.status(200).json({
            message: "Viewing product",
            data: product,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.viewOneProduct = viewOneProduct;
