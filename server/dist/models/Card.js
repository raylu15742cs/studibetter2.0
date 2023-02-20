"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var ObjectId = mongoose_1["default"].Types.ObjectId;
var CardSchema = new Schema({
    title: String,
    definition: String,
    status: { type: Number, "default": 0, min: 0, max: 4 },
    topic: { type: ObjectId }
});
var CardModel = mongoose_1["default"].model("Card", CardSchema);
exports["default"] = CardModel;
