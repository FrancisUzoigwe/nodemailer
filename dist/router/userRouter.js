"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.route("/register").post(userController_1.registerUser);
router.route("/view").get(userController_1.viewAll);
router.route("/:userID/:token/verify-account").patch(userController_1.verifyAccount);
exports.default = router;