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
const room_1 = __importDefault(require("../models/room"));
const getFilteredRooms = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, roomType, minPrice, maxPrice } = queries;
    try {
        /**
         * Check if the search query isn't properly constructed
         */
        // if (search === undefined) {
        //   throw new Error(
        //     "No search queries provided"
        //   );
        // }
        const matchedRooms = yield room_1.default.find({
            $or: [
                { name: { $regex: search ? search : "", $options: "i" } },
                { price: { "$gte": minPrice, "$lte": maxPrice } }
            ],
        }, undefined, { populate: { path: "roomType", options: { strict: false } } })
            .limit(10)
            .lean();
        return { data: matchedRooms };
    }
    catch (err) {
        throw err;
    }
});
exports.default = getFilteredRooms;
