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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
// route for getting all room types from the database
router.post("/signup", [
    (0, express_validator_1.body)("username").not().isEmpty().withMessage("Username must not be empty"),
    (0, express_validator_1.body)("email", "Invalid email provided")
        .isEmail()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const existingEmail = yield user_model_1.default.findOne({ email: value });
        if (existingEmail) {
            throw new Error("This email already exists, use another one.");
        }
    })),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be upto eight characters"),
    (0, express_validator_1.body)("role")
        .not()
        .isEmpty()
        .withMessage("User role must be specified to be either user or admin"),
], auth_controller_1.default.signup);
// route for getting all room types from the database
router.post("/login", [
    (0, express_validator_1.body)("email", "Invalid email provided")
        .isEmail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const existingEmail = yield user_model_1.default.findOne({ email: value });
        if (!existingEmail) {
            throw new Error("Email address not found");
        }
        return true;
    })),
    (0, express_validator_1.body)("password").custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        const passwordMatch = yield bcrypt_1.default.compare(value, user === null || user === void 0 ? void 0 : user.password);
        if (!passwordMatch) {
            throw Error("Incorrect Passoword");
        }
        return true;
    })),
], auth_controller_1.default.login);
exports.default = router;
