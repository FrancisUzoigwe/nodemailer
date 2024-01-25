"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productModel = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    imageID: { type: String },
    price: { type: Number, required: true },
    userID: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("products", productModel);
