import express , {Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";

import * as dotenv from 'dotenv'
dotenv.config()

import Deck from "./models/Topic"
import { createTopic, deleteTopic, getTopics } from "./controllers/topicController";
import { createCard, deleteCard, getCards, UpdateCard } from "./controllers/cardController";

const PORT = 5003;

const app = express()
app.use(
    cors({
        origin: "*"
    })
)
app.use(express.json())

app.get("/decks", getTopics)
app.post("/decks" , createTopic)
app.delete('/decks/:deckId', deleteTopic)
// app.put('/decks/:deckId' , updateTopic)

app.get("/decks/:deckId", getCards)
app.post("/decks/:deckId/cards" , createCard)
app.delete("/decks/:deckId/cards/:cardId", deleteCard)
app.put("/decks/:deckId/cards/:cardId", UpdateCard)


mongoose
    .connect(process.env.MONGO_URL!).then(() => {
        console.log(`listing on port ${PORT}`)
        app.listen(PORT)
    })