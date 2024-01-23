"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testdb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoString = "mongodb+srv://kossyuzoigwe:kossyuzoigwe@francisuzoigwe.3irljsp.mongodb.net/?retryWrites=true&w=majority";
exports.testdb = mongoose_1.default.connect(mongoString).then(() => {
    console.log("It's plenty");
});
