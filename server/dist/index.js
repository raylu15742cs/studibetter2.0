"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var topicController_1 = require("./controllers/topicController");
var cardController_1 = require("./controllers/cardController");
var quizController_1 = require("./controllers/quizController");
var PORT = process.env.PORT || 5003;
var app = (0, express_1["default"])();
app.get('/*', function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, '../index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.use((0, cors_1["default"])({
    origin: "*"
}));
app.use(express_1["default"].json());
app.get("/topics", topicController_1.getTopics);
app.post("/topics", topicController_1.createTopic);
app["delete"]('/topics/:topicId', topicController_1.deleteTopic);
app.put('/topics/:topicId/updateTopic', topicController_1.updateTopic);
app.get("/topics/:topicId", cardController_1.getCards);
app.post("/topics/:topicId/cards", cardController_1.createCard);
app["delete"]("/topics/:topicId/cards/:cardId", cardController_1.deleteCard);
app.put("/topics/:topicId/cards/:cardId", cardController_1.UpdateCard);
// Quiz functions
app.get("/topics/:topicId/quiz", quizController_1.getQuiz);
app.get("/topics/:topicId/quiz/terms", quizController_1.getDefinitions);
app.post("/topics/:topicId/quiz/:currentTerm/:result", quizController_1.updateScore);
mongoose_1["default"]
    .connect(process.env.MONGO_URL).then(function () {
    console.log("listing on port ".concat(PORT));
    app.listen(PORT);
});
