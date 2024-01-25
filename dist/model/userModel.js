"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    email: { type: String, trim: true, toLowercase: true },
    name: { type: String },
    password: { type: String },
    token: { type: String },
    verified: { type: Boolean, default: false },
    products: [
        { type: mongoose_1.Types.ObjectId, ref: "products" }
    ]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
