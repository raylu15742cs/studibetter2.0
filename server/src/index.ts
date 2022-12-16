import express , {Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";

import * as dotenv from 'dotenv'
dotenv.config()

import Deck from "./models/Deck"
import { createDeckController, deleteDeckController, getDecksController } from "./controllers/deckController";

const PORT = 5003;

const app = express()
app.use(
    cors({
        origin: "*"
    })
)
app.use(express.json())

app.get("/decks", getDecksController)
app.post("/decks" , createDeckController)
app.delete('/decks/:deckId', deleteDeckController)

mongoose
    .connect(process.env.MONGO_URL!).then(() => {
        console.log(`listing on port ${PORT}`)
        app.listen(PORT)
    })