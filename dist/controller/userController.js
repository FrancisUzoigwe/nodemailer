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
exports.deleteAccount = exports.viewOneAccount = exports.verifyAccount = exports.viewAll = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../config/email");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const token = crypto_1.default.randomBytes(4).toString("hex");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({
            email,
            token,
            name,
            password: hashed,
        });
        (0, email_1.sendEmail)(user);
        return res.status(201).json({
            message: "Success",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.registerUser = registerUser;
const viewAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: `Viewing ${users.length} user(s) on the platform`,
            data: users,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Accounts can't be seen",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.viewAll = viewAll;
const verifyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const realUser = yield userModel_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
                verified: true,
                new: true,
            });
            return res.status(200).json({
                message: "Successfully verified",
                data: realUser,
            });
        }
        else {
            return res.status(400).json({
                message: "Error verifying user",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while verifying account",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.verifyAccount = verifyAccount;
const viewOneAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(200).json({
            message: "Viewing one user account",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while viewing one account",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.viewOneAccount = viewOneAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "Successfully deleted",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error occured while deleting account",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.deleteAccount = deleteAccount;
