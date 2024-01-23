"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainApp_1 = require("./mainApp");
const testdb_1 = require("./config/testdb");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, mainApp_1.mainApp)(app);
const Server = app.listen(port, () => {
    testdb_1.testdb;
});
process.on("uncaughtException", (error) => {
    console.log("Server is shutting down due to an uncaught exception", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Server is shutting down due to an unhandled rejection", reason);
    Server.close(() => {
        process.exit(1);
    });
});
