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
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;
class Auth_Controller {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email, role } = req.body;
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let error = new Error(errors.array()[0].msg);
                    error.statusCode = 400;
                    throw error;
                }
                //   hash user password before saving to DB.
                const salt = yield bcrypt_1.default.genSalt(SALT_ROUNDS);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                // create a new user...
                const newUser = new user_model_1.default({
                    username,
                    password: hashedPassword,
                    email,
                    role,
                });
                (yield newUser.save()) &&
                    res
                        .status(200)
                        .json({ message: "user created", data: newUser, success: true });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, email } = req.body;
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let error = new Error(errors.array()[0].msg);
                    error.statusCode = 400;
                    throw error;
                }
                const user = yield user_model_1.default.findOne({ email: email }).select("-password");
                if (!user)
                    return res
                        .status(200)
                        .json({ message: "User not found", success: false });
                const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "24h" });
                return res
                    .status(200)
                    .json({
                    message: "Login Successfull",
                    data: { user, token },
                    success: true,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new Auth_Controller();
