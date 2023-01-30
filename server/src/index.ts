import express , {Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";

import * as dotenv from 'dotenv'
dotenv.config()

import Topic from "./models/Topic"
import { createTopic, deleteTopic, getTopics, updateTopic } from "./controllers/topicController";
import { createCard, deleteCard, getCards, UpdateCard } from "./controllers/cardController";
import { getDefinitions, getQuiz, updateScore } from "./controllers/quizController";

const path = require('path')

const PORT = 4001;

const app = express()
app.use(
    cors({
        origin: "*"
    })
)
app.use(express.json())

app.get("/topics", getTopics)
app.post("/topics" , createTopic)
app.delete('/topics/:topicId', deleteTopic)
app.put('/topics/:topicId/updateTopic' , updateTopic)

app.get("/topics/:topicId", getCards)
app.post("/topics/:topicId/cards" , createCard)
app.delete("/topics/:topicId/cards/:cardId", deleteCard)
app.put("/topics/:topicId/cards/:cardId", UpdateCard)

// Quiz functions
app.get("/topics/:topicId/quiz", getQuiz)
app.get("/topics/:topicId/quiz/terms", getDefinitions)
app.post("/topics/:topicId/quiz/:currentTerm/:result", updateScore)

// Making Build Folder as Public 
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


mongoose
    .connect(process.env.MONGO_URL!).then(() => {
        console.log(`listing on port ${PORT}`)
        app.listen(PORT)
    })