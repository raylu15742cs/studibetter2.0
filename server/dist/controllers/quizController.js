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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.storeSelected = exports.checkSelection = exports.updateScore = exports.getQuizF = exports.getDefinitions = exports.getQuiz = void 0;
var Card_1 = __importDefault(require("../models/Card"));
var Topic_1 = __importDefault(require("../models/Topic"));
// Gets a random 10 but not filtered yet
function getQuiz(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var topicId, topics, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topicId = req.params.topicId;
                    return [4 /*yield*/, Topic_1["default"].findById(topicId)];
                case 1:
                    topics = _a.sent();
                    return [4 /*yield*/, Card_1["default"].aggregate([{
                                $match: { topic: topics._id }
                            }, { $sample: { size: 10 } }])];
                case 2:
                    card = _a.sent();
                    res.json({ card: card });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getQuiz = getQuiz;
// Generate the definitions for each term
function getDefinitions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var topicId, topics, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topicId = req.params.topicId;
                    return [4 /*yield*/, Topic_1["default"].findById(topicId)];
                case 1:
                    topics = _a.sent();
                    return [4 /*yield*/, Card_1["default"].aggregate([{
                                $match: { topic: topics._id }
                            }, { $sample: { size: 4 } }])];
                case 2:
                    card = _a.sent();
                    res.json({ card: card });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getDefinitions = getDefinitions;
// Next Version will filter base on status
function getQuizF(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.getQuizF = getQuizF;
function updateScore(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var topicId, term, result, currentStatus, card, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topicId = req.params.topicId;
                    term = req.params.currentTerm;
                    result = req.params.result;
                    return [4 /*yield*/, Card_1["default"].find({ topic: topicId, title: term })];
                case 1:
                    currentStatus = _a.sent();
                    if (!(currentStatus[0].status != 4 && result == "true")) return [3 /*break*/, 3];
                    return [4 /*yield*/, Card_1["default"].findOneAndUpdate({ topic: topicId, title: term }, { $inc: { status: 1 } })];
                case 2:
                    card = _a.sent();
                    res.json(card);
                    return [3 /*break*/, 6];
                case 3:
                    if (!(currentStatus[0].status != 0 && result == "false")) return [3 /*break*/, 5];
                    return [4 /*yield*/, Card_1["default"].findOneAndUpdate({ topic: topicId, title: term }, { $inc: { status: -1 } })];
                case 4:
                    card = _a.sent();
                    res.json(card);
                    return [3 /*break*/, 6];
                case 5:
                    res.json(currentStatus);
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateScore = updateScore;
// Function that handles each selection
function checkSelection(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.checkSelection = checkSelection;
function storeSelected(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.storeSelected = storeSelected;
