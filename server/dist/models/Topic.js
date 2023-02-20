"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var ObjectId = mongoose_1["default"].Types.ObjectId;
var TopicSchema = new Schema({
    title: { type: String, minLength: 1, maxLength: 100 }
});
var TopicModel = mongoose_1["default"].model("Topic", TopicSchema);
exports["default"] = TopicModel;
